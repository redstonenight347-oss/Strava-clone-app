'use client'

import { useEffect } from 'react'
import { MapContainer, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { TileLayers } from './TileLayers'
import { decodePolyline } from '@repo/gpx'

type MapClientProps = {
  encodedPolyline?: string
  isStatic?: boolean
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

export default function MapClient({ encodedPolyline, isStatic = false, isChangeable }: MapClientProps) {
  useEffect(() => {
    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41] as [number, number],
      iconAnchor: [12, 41] as [number, number],
      shadowSize: [41, 41] as [number, number],
    })

    L.Marker.prototype.options.icon = DefaultIcon;
  }, [])

  const positions: L.LatLngTuple[] = encodedPolyline
    ? decodePolyline(encodedPolyline).map(
        (p) => [p.lat, p.lng] as L.LatLngTuple
      )
    : []

  const center: L.LatLngTuple = positions.length > 0
    ? positions[0] : [51.505, -0.09]

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="h-full w-full min-h-full"
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

      {positions.length > 0 && (
        <>
          <Polyline
            positions={positions}
            pathOptions={{
              color: '#FC4C02',
              weight: 3,
              opacity: 0.9,
            }}
          />
          <FitBounds positions={positions} />
        </>
      )}
    </MapContainer>
  )
}
