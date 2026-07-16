import { SpeedUnit } from "./types"

export function speedToMps(value: number, unit: SpeedUnit): number {
  switch (unit) {
    case "km/h": return value / 3.6
    case "mph":  return value / 2.23694
    case "m/s":  return value
  }
}

export function mpsToSpeed(mps: number, unit: SpeedUnit): string {
  switch (unit) {
    case "km/h": return (mps * 3.6).toFixed(2).concat(" km/h")
    case "mph":  return (mps * 2.23694).toFixed(2).concat(" mph")
    case "m/s":  return mps.toFixed(2).concat(" m/s")
  }
}