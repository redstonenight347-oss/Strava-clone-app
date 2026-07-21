"use client"

import dynamic from "next/dynamic"


const StaticRouteMap = dynamic(() => import('./StaticRouteMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 animate-pulse rounded" />
  ),
})

type Props = {
  encodedPolyline: string
}

export default function StaticMapWrapper({ encodedPolyline }: Props) {
  return <StaticRouteMap encodedPolyline={encodedPolyline} />
}