import type { LatLng, Sport, TileStyle } from './types';


// Default map settings


export const DEFAULT_CENTER: LatLng = {
  lat: 48.8566,  // Paris — change to your city
  lng: 2.3522,
};

export const DEFAULT_ZOOM = 13;

export const MIN_ZOOM = 3;
export const MAX_ZOOM = 18;


// Tile URL templates (OpenStreetMap variants — free, no API key)

// {z} = zoom level, {x} and {y} = tile coordinates (set by the map library)

export const TILE_URLS: Record<TileStyle, string> = {
  street:    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  terrain:   'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  dark:      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
};

export const TILE_ATTRIBUTIONS: Record<TileStyle, string> = {
  street:    '© OpenStreetMap contributors',
  terrain:   '© OpenStreetMap contributors, © OpenTopoMap',
  dark:      '© OpenStreetMap contributors © CARTO',
  satellite: '© Esri, Maxar, Earthstar Geographics',
};


// Sport-specific route colors (Strava uses orange as its primary)


export const SPORT_COLORS: Record<Sport, string> = {
  run:  '#FC4C02', // Strava orange
  ride: '#FC4C02', 
  swim: '#FC4C02', 
  hike: '#FC4C02', 
  walk: '#FC4C02', 
  ski:  '#FC4C02', 
};