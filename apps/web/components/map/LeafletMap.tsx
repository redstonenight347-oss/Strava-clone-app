'use client'

import { useEffect } from 'react'
import { TileProvider } from './TileProvider'
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'


export default function LeafletMap() {
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
      <LayersControl position="topright">
        {/* OpenStreetMap (Standard) */}

        {/* CartoDB Voyager */}
        <LayersControl.BaseLayer checked name={TileProvider.cartoVoyager.name}>
          <TileLayer
            url={TileProvider.cartoVoyager.url}
          // attribution={TileProvider.cartoVoyager.attribution}
          />
        </LayersControl.BaseLayer>
        {/* CartoDB Positron */}
        <LayersControl.BaseLayer name={TileProvider.cartoPositron.name}>
          <TileLayer
            url={TileProvider.cartoPositron.url}
          // attribution={TileProvider.cartoPositron.attribution}
          />
        </LayersControl.BaseLayer>
        {/* CartoDB Dark Matter */}
        <LayersControl.BaseLayer name={TileProvider.cartoDark.name}>
          <TileLayer
            url={TileProvider.cartoDark.url}
          // attribution={TileProvider.cartoDark.attribution}
          />
        </LayersControl.BaseLayer>
        {/* CyclOSM */}

        {/* OpenTopoMap */}
        <LayersControl.BaseLayer name={TileProvider.opentopo.name}>
          <TileLayer
            url={TileProvider.opentopo.url}
          // attribution={TileProvider.opentopo.attribution}
          />
        </LayersControl.BaseLayer>
        {/* Esri Satellite */}
        <LayersControl.BaseLayer name={TileProvider.esriSatellite.name}>
          <TileLayer
            url={TileProvider.esriSatellite.url}
          // attribution={TileProvider.esriSatellite.attribution}
          />
        </LayersControl.BaseLayer>
        {/* Esri Gray */}
        <LayersControl.BaseLayer name={TileProvider.esriGray.name}>
          <TileLayer
            url={TileProvider.esriGray.url}
          // attribution={TileProvider.esriGray.attribution}
          />
        </LayersControl.BaseLayer>
      </LayersControl>
    </MapContainer>
  )
}