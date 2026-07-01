'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// ⚠️ Leaflet's CSS must be imported here (or in a global stylesheet).
// Without this, map tiles are positioned incorrectly.
import 'leaflet/dist/leaflet.css';

import {
  MapConfig,
  Route,
  Waypoint,
  TILE_URLS,
  TILE_ATTRIBUTIONS,
  SPORT_COLORS,
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  getBoundsForPoints,
} from '@repo/map-utils';


// ⚠️ DO NOT call L.icon() or touch L.Marker at module top-level.
// Leaflet accesses `window` immediately when the module loads, so any
// top-level Leaflet calls will crash during SSR module evaluation,
// even when ssr: false is set. Move all setup into useEffect instead.

// ─────────────────────────────────────────────────────────────────────────────
// Auto-fit map bounds to a route
//
// This is a child component that uses the `useMap()` hook — this hook only
// works inside a <MapContainer>. We use it to fit the view to all route points.
// ─────────────────────────────────────────────────────────────────────────────
function BoundsFitter({ routes }: { routes: Route[] }) {
  const map = useMap();

  useEffect(() => {
    const allPoints = routes.flatMap((r) => r.points);
    if (allPoints.length === 0) return;

    const bounds = getBoundsForPoints(allPoints);
    if (!bounds) return;

    // fitBounds accepts a Leaflet LatLngBounds — we construct it from our shared type
    map.fitBounds(
      [
        [bounds.southWest.lat, bounds.southWest.lng],
        [bounds.northEast.lat, bounds.northEast.lng],
      ],
      { padding: [40, 40] } // padding in px around the bounds
    );
  }, [map, routes]);

  return null; // purely behavioural, renders nothing
}

// ─────────────────────────────────────────────────────────────────────────────
// Waypoint markers with type-based icons
// ─────────────────────────────────────────────────────────────────────────────
function WaypointMarkers({ waypoints }: { waypoints: Waypoint[] }) {
  return (
    <>
      {waypoints.map((wp) => (
        <Marker
          key={wp.id}
          position={[wp.position.lat, wp.position.lng]}
        >
          <Popup>{wp.label}</Popup>
        </Marker>
      ))}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Route polylines — one Polyline per route, coloured by sport
// ─────────────────────────────────────────────────────────────────────────────
function RoutePolylines({ routes }: { routes: Route[] }) {
  return (
    <>
      {routes.map((route) => {
        const positions = route.points.map(
          (p) => [p.lat, p.lng] as [number, number]
        );
        const color = route.color ?? SPORT_COLORS[route.sport] ?? '#FC4C02';

        return (
          <Polyline
            key={route.id}
            positions={positions}
            pathOptions={{
              color,
              weight: 4,       // line thickness in px
              opacity: 0.85,
              lineCap: 'round',
              lineJoin: 'round',
            }}
          />
        );
      })}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main LeafletMap component
// ─────────────────────────────────────────────────────────────────────────────
interface LeafletMapProps extends MapConfig {
  className?: string;
  height?: string;
}

export default function LeafletMap({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  routes = [],
  waypoints = [],
  tileStyle = 'dark',
  className = '',
  height = '100%',
}: LeafletMapProps) {
  // Fix broken marker icons — must run inside useEffect (client-only).
  // L.icon() internally accesses `window`, so it cannot run at module level.
  useEffect(() => {
    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []); // empty deps → runs once after first render, never on server
  return (
    <MapContainer
      // ⚠️ MapContainer must have an explicit height — it won't infer from CSS alone
      style={{ height, width: '100%' }}
      className={className}
      center={[center.lat, center.lng]}
      zoom={zoom}
      // Disable scroll zoom by default — feels more natural on a page
      scrollWheelZoom={true}
      // zoomControl position
      zoomControl={true}
    >
      {/* Tile layer — the base map imagery */}
      <TileLayer
        url={TILE_URLS[tileStyle]}
        attribution={TILE_ATTRIBUTIONS[tileStyle]}
        // maxNativeZoom: highest zoom the tile provider has data for
        maxNativeZoom={18}
        maxZoom={19}
      />

      {/* Auto-fit the map to all routes when routes are present */}
      {routes.length > 0 && <BoundsFitter routes={routes} />}

      {/* Draw route paths */}
      <RoutePolylines routes={routes} />

      {/* Draw waypoint markers */}
      {waypoints.length > 0 && <WaypointMarkers waypoints={waypoints} />}
    </MapContainer>
  );
}