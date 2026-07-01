// Core geographic types


// A latitude/longitude coordinate pair
export interface LatLng {
  lat: number;
  lng: number;
}

// An altitude-aware coordinate (for elevation profiles)
export interface LatLngAlt extends LatLng {
  alt: number; // metres above sea level
}

// A rectangular bounding box around a region
export interface MapBounds {
  northEast: LatLng;
  southWest: LatLng;
}


// Route / Activity types


// A single point in a recorded route, timestamped
export interface RoutePoint extends LatLngAlt {
  timestamp: Date;
  heartRate?: number;   // bpm
  cadence?: number;     // rpm/spm
  power?: number;       // watts
  speed?: number;       // m/s
}

// A complete route (an ordered list of points)
export interface Route {
  id: string;
  name: string;
  points: RoutePoint[];
  sport: Sport;
  color?: string; // hex, e.g. "#FC4C02" (Strava orange)
}

// A notable point along the route (start, end, PR, segment)
export interface Waypoint {
  id: string;
  position: LatLng;
  label: string;
  type: 'start' | 'finish' | 'checkpoint' | 'segment-start' | 'segment-end' | 'pr';
}


// Map configuration types


// What a map component receives as props (platform-agnostic)
export interface MapConfig {
  center: LatLng;
  zoom: number;           // 1–20
  routes?: Route[];
  waypoints?: Waypoint[];
  bounds?: MapBounds;
  tileStyle?: TileStyle;
}

// Available map tile styles
export type TileStyle = 'street' | 'satellite' | 'terrain' | 'dark';

// Sports supported by the app
export type Sport = 'run' | 'ride' | 'swim' | 'hike' | 'walk' | 'ski';


// GeoJSON (for importing/exporting GPX/FIT converted data)


export interface GeoJSONLineString {
  type: 'LineString';
  coordinates: [number, number, number?][]; // [lng, lat, alt?]
}

export interface GeoJSONFeature {
  type: 'Feature';
  geometry: GeoJSONLineString;
  properties: Record<string, unknown>;
}