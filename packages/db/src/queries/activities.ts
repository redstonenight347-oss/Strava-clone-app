import { eq } from "drizzle-orm"
import { db } from "../db"
import { activities } from "../schema"

type CreateActivityInput = {
  userId: string,
  type: string,
  title: string,
  description: string,
  distance: number,
  duration: number,
  elevationGain: number,
  elevationLoss: number,
  startTime?: Date,
  endTime?: Date,
}

export async function getActivitiesByUser(userId: any, limit = 5, offset = 0) {
  const UserActivities = await db
    .select({
      activityId: activities.activityId,
      userId: activities.userId,
      type: activities.type,
      title: activities.title,
      description: activities.description,
      distance: activities.distance,
      duration: activities.duration,
      encodedPolyline: activities.encodedPolyline,
      elevationGain: activities.elevationGain,
      elevationLoss: activities.elevationLoss,
      createdAt: activities.createdAt,
    })
    .from(activities)
    .where(eq(activities.userId, userId))
    .limit(limit)
    .offset(offset)

  return UserActivities
}

export async function CreateActivity(data: CreateActivityInput) {
  await db
    .insert(activities)
    .values(data)
}