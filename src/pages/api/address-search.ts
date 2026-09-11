import type { APIRoute } from 'astro';

export const prerender = false;

type AddressSuggestion = {
  label: string;
  postcode: string;
  context: string;
};

/**
 * Full-address lookup (numero + rue + commune). The BAN also returns
 * municipality-only results, so a user who types just "Montpellier" still
 * gets a usable suggestion.
 */
async function fetchFromAddressApi(query: string): Promise<AddressSuggestion[]> {
  const upstreamUrl = new URL('https://api-adresse.data.gouv.fr/search/');
  upstreamUrl.searchParams.set('q', query);
  upstreamUrl.searchParams.set('limit', '6');
  upstreamUrl.searchParams.set('autocomplete', '1');

  const response = await fetch(upstreamUrl, {
    headers: {
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Address API failed with ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data?.features)) {
    return [];
  }

  return data.features
    .map((feature: any) => {
      const properties = feature?.properties ?? {};
      // `name` is the street part for housenumber/street results and the
      // commune name for municipality results.
      const street = properties.name ?? '';
      const city = properties.city ?? '';
      const label = properties.type === 'municipality'
        ? city
        : [street, city].filter(Boolean).join(', ');

      return {
        label: label || properties.label || '',
        postcode: properties.postcode ?? '',
        context: properties.context ?? '',
      };
    })
    .filter((item: AddressSuggestion) => item.label);
}

/** Fallback when the BAN is down: commune-level results only. */
async function fetchFromCommunesApi(query: string): Promise<AddressSuggestion[]> {
  const upstreamUrl = new URL('https://geo.api.gouv.fr/communes');
  upstreamUrl.searchParams.set('nom', query);
  upstreamUrl.searchParams.set('limit', '6');
  upstreamUrl.searchParams.set('boost', 'population');
  upstreamUrl.searchParams.set('fields', 'nom,codesPostaux,departement,region');

  const response = await fetch(upstreamUrl, {
    headers: {
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Communes API failed with ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map((item: any) => ({
      label: item?.nom ?? '',
      postcode: Array.isArray(item?.codesPostaux) ? item.codesPostaux[0] ?? '' : '',
      context: [item?.departement?.nom, item?.region?.nom].filter(Boolean).join(', '),
    }))
    .filter((item: AddressSuggestion) => item.label);
}

/**
 * The BAN rejects queries it cannot act on with a 400 — notably a bare street
 * number ("12", typed before the street name) or a very short fragment. We
 * skip those instead of firing a request that is guaranteed to fail.
 * A full 5-digit postcode is valid on its own and must still go through.
 */
function isSearchable(query: string) {
  if (/^\d{5}$/.test(query)) return true;

  const letters = query.replace(/[^\p{L}]/gu, '');
  return letters.length >= 3;
}

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get('q')?.trim() ?? '';

  if (query.length < 2 || !isSearchable(query)) {
    return new Response(JSON.stringify({ suggestions: [] }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  try {
    let suggestions: AddressSuggestion[] = [];

    try {
      suggestions = await fetchFromAddressApi(query);
    } catch (firstError) {
      console.warn('Address API lookup failed, falling back to communes API', firstError);
      suggestions = await fetchFromCommunesApi(query);
    }

    return new Response(JSON.stringify({ suggestions }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=300',
      },
    });
  } catch (error) {
    console.error('Address search failed', error);

    return new Response(
      JSON.stringify({
        suggestions: [],
        error: "Recherche indisponible pour le moment. Vous pouvez saisir l'adresse manuellement.",
      }),
      {
        status: 502,
        headers: {
          'content-type': 'application/json',
        },
      },
    );
  }
};
