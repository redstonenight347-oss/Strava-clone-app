import type { LatLng, LatLngAlt, MapBounds, Route, RoutePoint, GeoJSONFeature } from './types';


// Distance & geometry


const EARTH_RADIUS_M = 6_371_000; // metres

/**
 * Haversine formula - calculates the great-circle distance between
 * two lat/lng points on Earth. Returns distance in metres.
 */
export function distanceBetween(a: LatLng, b: LatLng): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);

  const haversine =
    sinDLat * sinDLat +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinDLng * sinDLng;

  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(haversine));
}

/**
 * Total distance of an entire route in metres.
 * Iterates through each consecutive pair of points.
 */
export function totalRouteDistance(points: LatLng[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += distanceBetween(points[i - 1]!, points[i]!);
  }
  return total;
}

/**
 * Compass bearing from point A to point B, in degrees (0–360).
 * 0° = North, 90° = East, 180° = South, 270° = West.
 */
export function bearing(a: LatLng, b: LatLng): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}


// Bounding box helpers


/**
 * Computes the tightest bounding box that contains all given points.
 * Useful for auto-fitting the map view to a route.
 */
export function getBoundsForPoints(points: LatLng[]): MapBounds | null {
  if (points.length === 0) return null;

  let minLat = Infinity, maxLat = -Infinity;
  let minLng = Infinity, maxLng = -Infinity;

  for (const { lat, lng } of points) {
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  }

  return {
    northEast: { lat: maxLat, lng: maxLng },
    southWest: { lat: minLat, lng: minLng },
  };
}

/**
 * Returns the geographic center of a set of points.
 */
export function centerOfPoints(points: LatLng[]): LatLng {
  if (points.length === 0) return { lat: 0, lng: 0 };

  const sum = points.reduce(
    (acc, p) => ({ lat: acc.lat + p.lat, lng: acc.lng + p.lng }),
    { lat: 0, lng: 0 }
  );

  return {
    lat: sum.lat / points.length,
    lng: sum.lng / points.length,
  };
}


// Elevation helpers


/**
 * Total elevation gain (uphill only) across a route, in metres.
 * Downhill segments are ignored — mirrors how Strava calculates this.
 */
export function totalElevationGain(points: LatLngAlt[]): number {
  let gain = 0;
  for (let i = 1; i < points.length; i++) {
    const diff = points[i]!.alt - points[i - 1]!.alt;
    if (diff > 0) gain += diff;
  }
  return gain;
}


// Format helpers (UI display — shared between web and mobile)


/**
 * Formats metres into a human-readable distance string.
 * e.g. 1500 → "1.50 km", 800 → "800 m"
 */
export function formatDistance(metres: number): string {
  if (metres >= 1000) {
    return `${(metres / 1000).toFixed(2)} km`;
  }
  return `${Math.round(metres)} m`;
}

/**
 * Formats seconds into hh:mm:ss or mm:ss.
 * e.g. 3661 → "1:01:01", 125 → "2:05"
 */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');

  return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
}

/**
 * Formats pace as min/km from speed in m/s.
 * e.g. 3.0 m/s → "5:33 /km"
 */
export function formatPace(speedMs: number): string {
  if (speedMs <= 0) return '--:-- /km';
  const secsPerKm = 1000 / speedMs;
  const m = Math.floor(secsPerKm / 60);
  const s = Math.floor(secsPerKm % 60);
  return `${m}:${String(s).padStart(2, '0')} /km`;
}

// GeoJSON conversion


/**
 * Converts a Route into a GeoJSON Feature (LineString).
 * Useful for exporting routes or passing to third-party map layers.
 */
export function routeToGeoJSON(route: Route): GeoJSONFeature {
  return {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      // GeoJSON uses [longitude, latitude, altitude] — note lng comes first!
      coordinates: route.points.map((p) => [p.lng, p.lat, p.alt]),
    },
    properties: {
      id: route.id,
      name: route.name,
      sport: route.sport,
    },
  };
}

/**
 * Converts a GeoJSON Feature (LineString) back into RoutePoints.
 */
export function geoJSONToRoutePoints(feature: GeoJSONFeature): RoutePoint[] {
  return feature.geometry.coordinates.map(([lng, lat, alt], i) => ({
    lng: lng!,
    lat: lat!,
    alt: alt ?? 0,
    timestamp: new Date(), // GeoJSON doesn't store timestamps — would come from GPX
  }));
}