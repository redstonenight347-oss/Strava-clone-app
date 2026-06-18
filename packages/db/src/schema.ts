import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  userId: serial("user_id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow()
})

export const activities = pgTable("activities", {
  activityId: serial("activity_id").primaryKey(),
  userId: integer("user_id").references(() => users.userId),
  type: text("type").notNull(),
  title: text("title"),
  description: text("description"),
  distance: integer("distance").notNull(),
  duration: integer("duration").notNull(),
  createdAt: timestamp("created_at").defaultNow()
})