import { z } from "zod"

export const CreateActivitySchema = z.object({
  distance: z.number().nonnegative(),
  duration: z.object({
    hr: z.number().int().min(0),
    min: z.number().int().min(0).max(59),
    sec: z.number().int().min(0).max(59),
  }),
  elev: z.number().nonnegative(),
  type: z.enum(["Run", "Ride", "Swim", "Walk", "Hike", "Other"]),
  date: z.iso.date(),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  title: z.string().min(1).max(100),
  description: z.string().max(1000),
})

export const MetaDataSchema = z.object({
  distanceUnit: z.enum(["kilometers", "miles"]),
  elevUnit: z.enum(["meters", "feet"])
})

export type CreateActivityType = z.infer<typeof CreateActivitySchema>
export type MetaDataType = z.infer<typeof MetaDataSchema>