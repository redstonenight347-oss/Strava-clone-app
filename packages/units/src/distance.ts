import { DistanceUnit } from "./types"

export function distanceToMeters(value: number, unit: DistanceUnit): number {
  switch (unit) {
    case "kilometers": return Math.round(value * 1000)
    case "miles":      return Math.round(value * 1609.344)
  }
}

export function metersToDistance(meters: number, unit: DistanceUnit): string {
  switch (unit) {
    case "kilometers": return (meters / 1000).toFixed(2).concat(" km")
    case "miles":      return (meters / 1609.344).toFixed(2).concat(" mi")
  }
}