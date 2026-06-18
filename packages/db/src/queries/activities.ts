import { eq } from "drizzle-orm"
import { db } from "../db"
import { users, activities } from "../schema"

export async function getActivitiesByUser(userId: number) {
  const User_Activities = await db
  .select()
  .from(activities)
  .where(eq(activities.userId, userId))

  return User_Activities
}