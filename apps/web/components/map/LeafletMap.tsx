'use client'

import { useEffect } from 'react'
import { MapContainer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { TileLayers } from './TileLayers'


export default function LeafletMap({ isStatic }: { isStatic: boolean }) {
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

  return (
    <MapContainer
      center={[51.505, -0.09, 43]}
      zoom={13}
      className='h-full w-full'
    >
      <TileLayers isStatic={isStatic}/>
    </MapContainer>
  )
}