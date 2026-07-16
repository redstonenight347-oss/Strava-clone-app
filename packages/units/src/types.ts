export type DistanceUnit = "kilometers" | "miles"

export type ElevationUnit = "meters" | "feet"

export type SpeedUnit = "km/h" | "mph" | "m/s"

export type PaceUnit = "min/km" | "min/mi"

// Aggregate preference object (for passing around a full user config)
export type UnitPreferences = {
  distance: DistanceUnit
  elevation: ElevationUnit
  speed: SpeedUnit
  pace: PaceUnit
}