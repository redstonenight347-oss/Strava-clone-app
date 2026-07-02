// This file patches react-leaflet's MapContainerProps to include
// the center and zoom props that MapOptions should provide but aren't
// resolving correctly due to a v5 type issue.

import type { LatLngExpression } from 'leaflet';

// `declare module` re-opens an existing module's types.
// TypeScript merges this with the original MapContainerProps.
declare module 'react-leaflet' {
  interface MapContainerProps {
    center?: LatLngExpression;
    zoom?: number;
  }
}