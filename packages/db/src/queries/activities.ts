import { eq } from "drizzle-orm"
import { db } from "../db"
import { activities } from "../schema"

export async function getActivitiesByUser(userId: number, limit = 5, offset = 0) {
  const UserActivities = await db
  .select()
  .from(activities)
  .where(eq(activities.userId, userId))
  .limit(limit)
  .offset(offset)

  return UserActivities
}