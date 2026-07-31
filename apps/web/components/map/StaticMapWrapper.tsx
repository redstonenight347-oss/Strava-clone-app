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
  isStatic: boolean
  isChangeable: boolean
}

export default function StaticMapWrapper({ encodedPolyline, isStatic, 
  isChangeable }: Props) {
  return <StaticRouteMap encodedPolyline={encodedPolyline} isStatic={isStatic} isChangeable={isChangeable} />
}