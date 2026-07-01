"use client"
// NOTE: No 'use client' here — this wrapper can be used from Server Components.
// The dynamic import below is what creates the client boundary.

import dynamic from 'next/dynamic';
import type { MapConfig } from '@repo/map-utils';

// Dynamically import the Leaflet component with SSR disabled.
// `loading` renders a placeholder while the map JS is loading on the client.
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1a2e',
        color: '#888',
        fontSize: '14px',
        borderRadius: '12px',
      }}
    >
      Loading map…
    </div>
  ),
});

interface LeafletMapWrapperProps extends MapConfig {
  className?: string;
  height?: string;
}

export default function LeafletMapWrapper(props: LeafletMapWrapperProps) {
  return <LeafletMap {...props} />;
}