'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet'
import { decodePolyline } from '@repo/gpx'
import { TileProvider } from './TileProvider'
import L from 'leaflet'

type StaticRouteMapProps = {
  encodedPolyline: string
}


function FitBounds({ positions }: { positions: L.LatLngTuple[] }) {
  const map = useMap()

  useEffect(() => {
    if (positions.length === 0) return
    const bounds = L.latLngBounds(positions)
    map.fitBounds(bounds, { padding: [20, 20] })
  }, [map, positions])

  return null
}


export default function StaticRouteMap({ encodedPolyline }: StaticRouteMapProps) {
  const positions: L.LatLngTuple[] = decodePolyline(encodedPolyline).map(
    (p) => [p.lat, p.lng]
  )

  const center: L.LatLngTuple = positions.length > 0
    ? positions[0] : [0, 0]

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="h-full w-full min-h-full"
      // Disable ALL interactions to make the map static
      zoomControl={false}
      attributionControl={false}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      touchZoom={false}
      boxZoom={false}
      keyboard={false}
    >
      <TileLayer
        url={TileProvider.openstreetmap.url}
      />

      <Polyline
        positions={positions}
        pathOptions={{
          color: '#FC4C02',
          weight: 3,
          opacity: 0.9,
        }}
      />

      <FitBounds positions={positions} />
    </MapContainer>
  )
}