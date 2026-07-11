import { db } from "../db"
import { activities, activityStreams } from "../schema"
import type { ActivityStreams } from "@repo/types"


type CreateActivityFromGpxInput = {
  userId: string,
  type: string,
  title: string,
  distance: number,         // metres
  duration: number,          // seconds
  elevationGain: number,     // metres (renamed from "elevation")
  elevationLoss: number,     // metres
  date: string,              // "2024-01-15"
  time: string,              // "08:30:00"
  encodedPolyline: string,
  avgSpeedMps: number,
  maxSpeedMps: number,
}

type CreateActivityStreamsInput = {
  activityId: number,
  streams: ActivityStreams,
}

// --- Queries ---

export async function CreateActivityFromGpx(data: CreateActivityFromGpxInput) {
  const [inserted] = await db
    .insert(activities)
    .values({
      userId: data.userId,
      type: data.type,
      title: data.title,
      distance: data.distance,
      duration: data.duration,
      elevationGain: data.elevationGain,
      elevationLoss: data.elevationLoss,
      date: data.date,
      time: data.time,
      encodedPolyline: data.encodedPolyline,
      avgSpeedMps: data.avgSpeedMps,
      maxSpeedMps: data.maxSpeedMps,
    })
    .returning({ activityId: activities.activityId })

  return inserted
}

export async function CreateActivityStreams(data: CreateActivityStreamsInput) {
  await db
    .insert(activityStreams)
    .values({
      activityId: data.activityId,
      timeData: data.streams.time,
      distanceData: data.streams.distance,
      altitudeData: data.streams.altitude,
      speedData: data.streams.speed,
    })
}