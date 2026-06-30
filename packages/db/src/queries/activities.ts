import { eq } from "drizzle-orm"
import { db } from "../db"
import { activities } from "../schema"

type CreateActivityInput = {
  type: string
  title: string
  description: string
  date: string
  time: string
  distance: number
  duration: number
  elevation: number
}

export async function getActivitiesByUser(userId: any, limit = 5, offset = 0) {
  const UserActivities = await db
    .select()
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