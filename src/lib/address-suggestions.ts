export interface AddressSuggestion { label: string; postcode: string; context: string }

export async function fetchAddressSuggestions(query: string): Promise<AddressSuggestion[]> {
  const requestPath = `/api/address-search?q=${encodeURIComponent(query)}`;
  const directUrl = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=6&autocomplete=1`;

  const parseSuggestions = (payload: any): AddressSuggestion[] => {
    if (Array.isArray(payload?.suggestions)) {
      return payload.suggestions;
    }

    if (Array.isArray(payload?.features)) {
      return payload.features.map((feature: any) => {
        const properties = feature?.properties ?? {};
        const label = properties.type === "municipality"
          ? properties.city ?? properties.name ?? ""
          : [properties.name, properties.city].filter(Boolean).join(", ");

        return {
          label: label || properties.label || "",
          postcode: properties.postcode ?? "",
          context: properties.context ?? "",
        };
      });
    }

    return [];
  };

  const tryFetch = async (url: string) => {
    const response = await fetch(url);
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload?.error || "La recherche d'adresses a échoué.");
    }

    return parseSuggestions(payload);
  };

  try {
    return await tryFetch(requestPath);
  } catch {
    return tryFetch(directUrl);
  }
}
