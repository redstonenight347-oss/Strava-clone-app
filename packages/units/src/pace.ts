import { PaceUnit } from "./types"

export function computePace(durationSec: number, distanceMeters: number, unit: PaceUnit): number {
  if (distanceMeters <= 0) return 0

  const minutes = durationSec / 60

  switch (unit) {
    case "min/km": return Number((minutes / (distanceMeters / 1000)).toFixed(2))
    case "min/mi": return Number((minutes / (distanceMeters / 1609.344)).toFixed(2))
  }
}

export function formatPace(durationSec: number, distanceMeters: number, unit: PaceUnit): string {
  if (distanceMeters <= 0) return "0:00 " + unit

  const pace = computePace(durationSec, distanceMeters, unit)
  const mins = Math.floor(pace)
  const secs = Math.round((pace - mins) * 60)

  const label = unit === "min/km" ? "/km" : "/mi"

  return `${mins}:${secs.toString().padStart(2, "0")} ${label}`
}
