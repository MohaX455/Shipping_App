const BASE_URL = "https://api.jetcamer.com";

export type LocationSuggestion = {
  address: string;
  latitude: number;
  longitude: number;
};

export async function searchLocation(query: string): Promise<LocationSuggestion[]> {
  const res = await fetch(`${BASE_URL}/location/${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch location suggestions");
  }

  return res.json();
}

export async function getGeoData(lat: number, lon: number) {
  const res = await fetch(`${BASE_URL}/geo-data/${lat}/${lon}`);

  if (!res.ok) {
    throw new Error("Failed to fetch geo data");
  }

  return res.json();
}