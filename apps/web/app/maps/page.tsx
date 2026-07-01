// This is a Server Component — no 'use client' needed here.
// The map itself is loaded client-side via the wrapper's dynamic import.

import LeafletMapWrapper from '@/components/map/LeafletMapWrapper';
import type { Route, Waypoint } from '@repo/map-utils';
import { DEFAULT_CENTER } from '@repo/map-utils';

// ─────────────────────────────────────────────────────────────────────────────
// Demo data — replace with real DB queries from @repo/db
// ─────────────────────────────────────────────────────────────────────────────
const demoRoute: Route = {
  id: 'demo-route-1',
  name: 'Morning Run',
  sport: 'run',
  points: [
    { lat: 48.8566, lng: 2.3522, alt: 35, timestamp: new Date() },
    { lat: 48.8576, lng: 2.3540, alt: 36, timestamp: new Date() },
    { lat: 48.8590, lng: 2.3558, alt: 38, timestamp: new Date() },
    { lat: 48.8605, lng: 2.3570, alt: 37, timestamp: new Date() },
    { lat: 48.8620, lng: 2.3555, alt: 40, timestamp: new Date() },
    { lat: 48.8615, lng: 2.3530, alt: 41, timestamp: new Date() },
    { lat: 48.8600, lng: 2.3515, alt: 39, timestamp: new Date() },
    { lat: 48.8580, lng: 2.3510, alt: 37, timestamp: new Date() },
    { lat: 48.8566, lng: 2.3522, alt: 35, timestamp: new Date() }, // back to start
  ],
};

const demoWaypoints: Waypoint[] = [
  {
    id: 'wp-start',
    position: { lat: 48.8566, lng: 2.3522 },
    label: '🏁 Start / Finish',
    type: 'start',
  },
  {
    id: 'wp-pr',
    position: { lat: 48.8620, lng: 2.3555 },
    label: '⚡ Personal Record',
    type: 'pr',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function MapsPage() {
  return (
    <main className="maps-page">
      <header className="maps-header">
        <h1>Activity Map</h1>
        <p>Explore your routes and activities</p>
      </header>

      {/* The map fills a defined area. Height MUST be set — Leaflet needs it. */}
      <section className="maps-container">
        <LeafletMapWrapper
          center={DEFAULT_CENTER}
          zoom={14}
          routes={[demoRoute]}
          waypoints={demoWaypoints}
          tileStyle="dark"
          height="600px"
        />
      </section>
    </main>
  );
}