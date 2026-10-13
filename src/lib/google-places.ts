export interface PlacesData {
  rating: number;
  reviewCount: number;
}

const DEFAULT_FALLBACK: PlacesData = { rating: 5.0, reviewCount: 243 };

/**
 * Figures shown when the live Google lookup is unavailable (no API key, billing off, outage).
 * Editable without a code change: set REVIEW_COUNT_FALLBACK / REVIEW_RATING_FALLBACK in the env.
 */
function getFallback(): PlacesData {
  const count = Number.parseInt(process.env.REVIEW_COUNT_FALLBACK ?? '', 10);
  const rating = Number.parseFloat((process.env.REVIEW_RATING_FALLBACK ?? '').replace(',', '.'));
  return {
    rating: Number.isFinite(rating) && rating > 0 && rating <= 5 ? rating : DEFAULT_FALLBACK.rating,
    reviewCount: Number.isFinite(count) && count > 0 ? count : DEFAULT_FALLBACK.reviewCount,
  };
}

let cache: { data: PlacesData; expiresAt: number } | null = null;
let lastGood: PlacesData | null = null;
const TTL = 24 * 60 * 60 * 1000; // refresh once a day (~30 Places calls/month)
const FAILURE_TTL = 5 * 60 * 1000; // back off for 5 min after a failed lookup

/** On failure: serve the last good value if we ever had one, else the hardcoded figures. */
function degrade(reason: string): PlacesData {
  // Never silent: a bad key / disabled billing used to freeze the counter at the fallback unnoticed.
  console.warn(`[google-places] live review count unavailable (${reason}); serving ${lastGood ? 'last known' : 'fallback'} figures`);
  const data = lastGood ?? getFallback();
  cache = { data, expiresAt: Date.now() + FAILURE_TTL };
  return data;
}

export async function getPlacesData(): Promise<PlacesData> {
  if (cache && Date.now() < cache.expiresAt) return cache.data;

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return degrade('GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID not set');

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=rating,user_ratings_total&key=${apiKey}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    const data = await res.json();

    if (data.status !== 'OK' || !data.result) {
      return degrade(`${data.status}${data.error_message ? `: ${data.error_message}` : ''}`);
    }

    const result: PlacesData = {
      rating: data.result.rating ?? getFallback().rating,
      reviewCount: data.result.user_ratings_total ?? getFallback().reviewCount,
    };
    lastGood = result;
    cache = { data: result, expiresAt: Date.now() + TTL };
    return result;
  } catch (err) {
    return degrade(err instanceof Error ? err.message : 'request failed');
  }
}

export function formatRating(rating: number): string {
  return rating.toFixed(1).replace('.', ',');
}
