'use client'

import { useEffect } from 'react'
import { MapContainer, Polyline, useMap } from 'react-leaflet'
import { decodePolyline } from '@repo/gpx'
import L from 'leaflet'
import { TileLayers } from './TileLayers'

type StaticRouteMapProps = {
  encodedPolyline: string
  isStatic: boolean
  isChangeable: boolean
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


export default function StaticRouteMap({ encodedPolyline, isStatic, isChangeable }: StaticRouteMapProps) {
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
      
      zoomControl={!isStatic}
      attributionControl={!isStatic}
      dragging={!isStatic}
      scrollWheelZoom={!isStatic}
      doubleClickZoom={!isStatic}
      touchZoom={!isStatic}
      boxZoom={!isStatic}
      keyboard={!isStatic}
    >
      <TileLayers isChangeable={isChangeable} />

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