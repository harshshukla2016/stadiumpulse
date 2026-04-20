import { fallbackVenueIntel, type VenueIntel } from "@/lib/venueIntel";

type GeoJsResponse = {
  city?: string;
  region?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
};

type OpenMeteoResponse = {
  current?: {
    temperature_2m?: number;
    relative_humidity_2m?: number;
    precipitation?: number;
    wind_speed_10m?: number;
  };
};

type CarbonIntensityResponse = {
  data?: Array<{
    intensity?: {
      forecast?: number;
      actual?: number;
      index?: string;
    };
  }>;
};

const jsonHeaders = {
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900",
};

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function GET() {
  const geo = await fetchJson<GeoJsResponse>("https://get.geojs.io/v1/ip/geo.json");

  const latitude = Number(geo?.latitude) || fallbackVenueIntel.location.latitude;
  const longitude = Number(geo?.longitude) || fallbackVenueIntel.location.longitude;
  const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
  weatherUrl.searchParams.set("latitude", String(latitude));
  weatherUrl.searchParams.set("longitude", String(longitude));
  weatherUrl.searchParams.set("current", "temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m");
  weatherUrl.searchParams.set("timezone", "auto");

  const [weather, carbon] = await Promise.all([
    fetchJson<OpenMeteoResponse>(weatherUrl.toString()),
    fetchJson<CarbonIntensityResponse>("https://api.carbonintensity.org.uk/intensity"),
  ]);

  const current = weather?.current;
  const intensity = carbon?.data?.[0]?.intensity;
  const hasLiveWeather =
    typeof current?.temperature_2m === "number" &&
    typeof current.relative_humidity_2m === "number" &&
    typeof current.precipitation === "number" &&
    typeof current.wind_speed_10m === "number";
  const hasLiveCarbon =
    typeof intensity?.forecast === "number" || typeof intensity?.actual === "number";

  const payload: VenueIntel = {
    status: hasLiveWeather || hasLiveCarbon ? "live" : "fallback",
    updatedAt: new Date().toISOString(),
    location: {
      city: geo?.city || fallbackVenueIntel.location.city,
      region: geo?.region || fallbackVenueIntel.location.region,
      country: geo?.country || fallbackVenueIntel.location.country,
      latitude,
      longitude,
      source: geo ? "GeoJS" : "Fallback",
    },
    weather: hasLiveWeather
      ? {
          temperatureC: current.temperature_2m as number,
          humidity: current.relative_humidity_2m as number,
          precipitationMm: current.precipitation as number,
          windKph: current.wind_speed_10m as number,
          source: "Open-Meteo",
        }
      : fallbackVenueIntel.weather,
    carbon: hasLiveCarbon
      ? {
          intensity: intensity?.actual ?? (intensity?.forecast as number),
          index: intensity?.index || fallbackVenueIntel.carbon.index,
          source: "UK Carbon Intensity",
        }
      : fallbackVenueIntel.carbon,
  };

  return Response.json(payload, { headers: jsonHeaders });
}
