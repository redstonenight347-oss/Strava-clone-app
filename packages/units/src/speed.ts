import { SpeedUnit } from "./types"

export function speedToMps(value: number, unit: SpeedUnit): number {
  switch (unit) {
    case "km/h": return value / 3.6
    case "mph":  return value / 2.23694
    case "m/s":  return value
  }
}

export function mpsToSpeed(mps: number, unit: SpeedUnit): number {
  switch (unit) {
    case "km/h": return Number((mps * 3.6).toFixed(2))
    case "mph":  return Number((mps * 2.23694).toFixed(2))
    case "m/s":  return Number(mps.toFixed(2))
  }
}