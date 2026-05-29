export interface PlacesData {
  rating: number;
  reviewCount: number;
}

const FALLBACK: PlacesData = { rating: 5.0, reviewCount: 194 };

export async function getPlacesData(): Promise<PlacesData> {
  // Use process.env so the key is read at runtime and never inlined into the bundle
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return FALLBACK;

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=rating,user_ratings_total&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== 'OK' || !data.result) return FALLBACK;

    return {
      rating: data.result.rating ?? FALLBACK.rating,
      reviewCount: data.result.user_ratings_total ?? FALLBACK.reviewCount,
    };
  } catch {
    return FALLBACK;
  }
}

export function formatRating(rating: number): string {
  return rating.toFixed(1).replace('.', ',');
}
