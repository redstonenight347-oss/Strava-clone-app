import { DistanceUnit } from "./types"

export function distanceToMeters(value: number, unit: DistanceUnit): number {
  switch (unit) {
    case "metric": return Math.round(value * 1000)
    case "imperial": return Math.round(value * 1609.344)
  }
}

export function metersToDistance(meters: number, unit: DistanceUnit): number {
  switch (unit) {
    case "metric": return Number((meters / 1000).toFixed(2))
    case "imperial": return Number((meters / 1609.344).toFixed(2))
  }
}