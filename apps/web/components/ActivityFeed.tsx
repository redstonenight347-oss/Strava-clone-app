"use client"

import { ActivityType } from "@repo/types"
import { useEffect, useRef, useState } from "react"
import ActivityCard from "./ActivityCard"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default function ActivityFeed({ initialActivities, userId }: { 
  initialActivities: ActivityType[],
  userId: string | undefined }) {
  const [activities, setActivities] = useState(initialActivities)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        fetchMore()
      }
    },
      { threshold: 0.1 }  // trigger when div is 10% visible
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => observer.disconnect()
  }, [page, hasMore, loading])


  async function fetchMore() {
    setLoading(true)
    const res = await fetch(`/api/activities?userId=${userId}&page=${page}&limit=5`)
    const data: ActivityType[] = await res.json()

    if (data.length === 0) {
      setHasMore(false)
    }
    else {
      setActivities((prev) => [...prev, ...data])
      setPage((prev) => prev + 1)
    }
    setLoading(false)
  }

  return (
    <div>
      {activities.map((a) => (
        <ActivityCard key={a.activityId} activities={a} />
      ))}

      {/* The invisible div observer */}
      <div ref={sentinelRef} className="h-1" />

      {loading && <p>Loading more activities</p>}
      {!hasMore && <p>You've seen all activities</p>}
    </div>
  )
}