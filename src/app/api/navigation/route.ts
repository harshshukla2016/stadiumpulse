import {
  createFallbackNavigationIntel,
  createNavigationUrls,
  type Coordinate,
  type NavigationIntel,
  type RouteLineString,
} from "@/lib/navigation";

type OsrmRouteResponse = {
  code?: string;
  routes?: Array<{
    distance?: number;
    duration?: number;
    geometry?: RouteLineString;
  }>;
};

const jsonHeaders = {
  "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
};

function readCoordinate(searchParams: URLSearchParams): Coordinate {
  const latitude = Number(searchParams.get("lat"));
  const longitude = Number(searchParams.get("lon"));

  return {
    latitude: Number.isFinite(latitude) ? latitude : 26.4631,
    longitude: Number.isFinite(longitude) ? longitude : 80.3479,
  };
}

async function fetchOsrmRoute(origin: Coordinate, pickup: Coordinate) {
  const coordinates = `${origin.longitude},${origin.latitude};${pickup.longitude},${pickup.latitude}`;
  const url = new URL(`https://router.project-osrm.org/route/v1/driving/${coordinates}`);
  url.searchParams.set("overview", "full");
  url.searchParams.set("geometries", "geojson");
  url.searchParams.set("steps", "false");

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 120 },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as OsrmRouteResponse;
    if (data.code !== "Ok" || !data.routes?.[0]) {
      return null;
    }

    return data.routes[0];
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = readCoordinate(searchParams);
  const fallback = createFallbackNavigationIntel(origin);
  const route = await fetchOsrmRoute(fallback.origin, fallback.pickup);

  if (!route || typeof route.distance !== "number" || typeof route.duration !== "number") {
    return Response.json(
      {
        ...fallback,
        updatedAt: new Date().toISOString(),
      },
      { headers: jsonHeaders },
    );
  }

  const urls = createNavigationUrls(fallback.origin, fallback.pickup, fallback.dropoff);
  const payload: NavigationIntel = {
    ...fallback,
    status: "live",
    source: "OSRM",
    updatedAt: new Date().toISOString(),
    distanceKm: Number((route.distance / 1000).toFixed(1)),
    durationMinutes: Math.max(1, Math.round(route.duration / 60)),
    routeGeometry: route.geometry || null,
    mapEmbedUrl: urls.mapEmbedUrl,
    directionsUrl: urls.directionsUrl,
    taxi: {
      ...fallback.taxi,
      bookingUrl: urls.bookingUrl,
    },
  };

  return Response.json(payload, { headers: jsonHeaders });
}
