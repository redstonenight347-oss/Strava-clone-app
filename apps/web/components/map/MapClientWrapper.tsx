"use client"

import dynamic from 'next/dynamic'

const LeafletMap = dynamic(() => import('./LeafletMap'),{
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded" />,
  }
)

export default function MapClientWrapper({ isChangeable }: { isChangeable: boolean }) {
  return <LeafletMap isChangeable={isChangeable} />
}
