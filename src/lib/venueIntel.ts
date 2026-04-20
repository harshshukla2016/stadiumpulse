export type ApiHealth = "loading" | "live" | "fallback";

export interface VenueIntel {
  status: ApiHealth;
  updatedAt: string;
  location: {
    city: string;
    region: string;
    country: string;
    latitude: number;
    longitude: number;
    source: "GeoJS" | "Fallback";
  };
  weather: {
    temperatureC: number;
    humidity: number;
    precipitationMm: number;
    windKph: number;
    source: "Open-Meteo" | "Fallback";
  };
  carbon: {
    intensity: number;
    index: string;
    source: "UK Carbon Intensity" | "Fallback";
  };
}

export const fallbackVenueIntel: VenueIntel = {
  status: "fallback",
  updatedAt: new Date(0).toISOString(),
  location: {
    city: "Kanpur",
    region: "Uttar Pradesh",
    country: "India",
    latitude: 26.4631,
    longitude: 80.3479,
    source: "Fallback",
  },
  weather: {
    temperatureC: 25,
    humidity: 54,
    precipitationMm: 0,
    windKph: 5,
    source: "Fallback",
  },
  carbon: {
    intensity: 165,
    index: "moderate",
    source: "Fallback",
  },
};
