import { eq } from "drizzle-orm"
import { db } from "../db"
import { activities } from "../schema"

export async function getActivitiesByUser(userId: number) {
  const UserActivities = await db
  .select()
  .from(activities)
  .where(eq(activities.userId, userId))

  return UserActivities
}