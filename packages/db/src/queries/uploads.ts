import { db } from "../db"
import { activities, activityStreams } from "../schema"
import type { ActivityStreams } from "@repo/types"


type CreateActivityFromGpxInput = {
  userId: string,
  type: string,
  title: string,
  description: string | null,
  distance: number,         // metres
  duration: number,          // seconds
  elevationGain: number,     // metres (renamed from "elevation")
  elevationLoss: number,     // metres
  encodedPolyline: string,
  maxSpeedMps: number,
  startTime: Date,
  endTime: Date,
}

type CreateActivityStreamsInput = {
  activityId: string,
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
      description: data.description,
      distance: data.distance,
      duration: data.duration,
      elevationGain: data.elevationGain,
      elevationLoss: data.elevationLoss,
      encodedPolyline: data.encodedPolyline,
      maxSpeedMps: data.maxSpeedMps,
      startTime: data.startTime,
      endTime: data.endTime,
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