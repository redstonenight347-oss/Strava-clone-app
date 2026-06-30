// Distance -> meters

export const kmToMeters = (km: number): number => Math.round(km * 1000)

export const milesToMeters = (miles: number): number => Math.round(miles * 1609.344)

export const toMeters = (value: number, unit: "kilometers" | "miles"): number =>
  unit === "kilometers" ? kmToMeters(value) : milesToMeters(value)


// Duration -> seconds

export const durationToSeconds = (duration: {
  hr: number
  min: number
  sec: number
}): number => duration.hr * 3600 + duration.min * 60 + duration.sec


// Elevation -> meters 

export const feetToMeters = (feet: number): number => Math.round(feet * 0.3048)

export const toElevationMeters = (value: number, unit: "meters" | "feet"): number =>
  unit === "meters" ? Math.round(value) : feetToMeters(value)
