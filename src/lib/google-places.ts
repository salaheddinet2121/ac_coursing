export interface PlacesData {
  rating: number;
  reviewCount: number;
}

const FALLBACK: PlacesData = { rating: 5.0, reviewCount: 194 };

let cache: { data: PlacesData; expiresAt: number } | null = null;
const TTL = 60 * 60 * 1000; // 1 hour

export async function getPlacesData(): Promise<PlacesData> {
  if (cache && Date.now() < cache.expiresAt) return cache.data;

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return FALLBACK;

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=rating,user_ratings_total&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== 'OK' || !data.result) return FALLBACK;

    const result: PlacesData = {
      rating: data.result.rating ?? FALLBACK.rating,
      reviewCount: data.result.user_ratings_total ?? FALLBACK.reviewCount,
    };
    cache = { data: result, expiresAt: Date.now() + TTL };
    return result;
  } catch {
    return FALLBACK;
  }
}

export function formatRating(rating: number): string {
  return rating.toFixed(1).replace('.', ',');
}
