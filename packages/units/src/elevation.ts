import { ElevationUnit } from "./types"

export function elevationToMeters(value: number, unit: ElevationUnit): number {
  switch (unit) {
    case "meters": return Math.round(value)
    case "feet":   return Math.round(value * 0.3048)
  }
}

export function metersToElevation(meters: number, unit: ElevationUnit): string {
  switch (unit) {
    case "meters": return Math.round(meters).toString().concat(" m")
    case "feet":   return Math.round(meters / 0.3048).toString().concat(" ft")
  }
}