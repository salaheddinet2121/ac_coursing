import type { APIRoute } from 'astro';

export const prerender = false;

type CitySuggestion = {
  label: string;
  postcode: string;
  context: string;
};

async function fetchFromCommunesApi(query: string): Promise<CitySuggestion[]> {
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
    .filter((item: CitySuggestion) => item.label);
}

async function fetchFromAddressApi(query: string): Promise<CitySuggestion[]> {
  const upstreamUrl = new URL('https://api-adresse.data.gouv.fr/search/');
  upstreamUrl.searchParams.set('q', query);
  upstreamUrl.searchParams.set('type', 'municipality');
  upstreamUrl.searchParams.set('limit', '6');

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
    .map((feature: any) => ({
      label: feature?.properties?.city ?? feature?.properties?.name ?? '',
      postcode: feature?.properties?.postcode ?? '',
      context: feature?.properties?.context ?? '',
    }))
    .filter((item: CitySuggestion) => item.label);
}

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get('q')?.trim() ?? '';

  if (query.length < 2) {
    return new Response(JSON.stringify({ suggestions: [] }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  try {
    let suggestions: CitySuggestion[] = [];

    try {
      suggestions = await fetchFromCommunesApi(query);
    } catch (firstError) {
      console.warn('Communes API lookup failed, falling back to address API', firstError);
      suggestions = await fetchFromAddressApi(query);
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
        error: 'Recherche indisponible pour le moment. Vous pouvez saisir la ville manuellement.',
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
