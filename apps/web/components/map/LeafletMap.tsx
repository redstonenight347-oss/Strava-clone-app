'use client'

import { useEffect } from 'react'
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const TileProvider = {
  openstreetmap: {
    name: 'OpenStreetMap (Standard)',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  cartoVoyager: {
    name: 'CartoDB Voyager (Modern & Colorful)',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  cartoPositron: {
    name: 'CartoDB Positron (Minimal Light)',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  cartoDark: {
    name: 'CartoDB Dark Matter (Sleek Dark)',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  cyclosm: {
    name: 'CyclOSM (Cycling Infrastructure)',
    url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Style: &copy; <a href="https://github.com/cyclosm/cyclosm-cartocss-style">CyclOSM</a>',
  },
  opentopo: {
    name: 'OpenTopoMap (Topographic Terrain)',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  },
  esriSatellite: {
    name: 'Esri World Imagery (Satellite)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
  esriGray: {
    name: 'Esri Light Gray Canvas',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
  },
}

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