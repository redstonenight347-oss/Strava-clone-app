'use client'

import dynamic from 'next/dynamic'

const LeafletMap = dynamic(() => import('./LeafletMap'),{
    ssr: false,
    loading: () => <p>Loading map...</p>,
  }
)

export default function MapClientWrapper() {
  return <LeafletMap />
}
