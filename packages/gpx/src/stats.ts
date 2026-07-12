import { haversineDistance } from "./haversine"
import { RawTrackpoint } from "./parser"

export type ActivityStats = {
  totalDistanceMeters: number,
  totalDurationSeconds: number,
  elevationGainMeters: number,
  elevationLossMeters: number,
  maxSpeedMps: number,
  startTime: Date | null,
  endTime: Date | null,
}


export function computeStats(points: RawTrackpoint[]): ActivityStats {
  if (points.length < 2) {
    return {
      totalDistanceMeters: 0,
      totalDurationSeconds: 0,
      elevationGainMeters: 0,
      elevationLossMeters: 0,
      maxSpeedMps: 0,
      startTime: points[0]?.time ?? null,
      endTime: points[0]?.time ?? null,
    }
  }

  let totalDistance = 0
  let elevationGain = 0
  let elevationLoss = 0
  let maxSpeed = 0

  const ELEVATION_NOISE_THRESHOLD = 2 // metres — ignore changes smaller than this

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    // --- Distance ---
    const segmentDist = haversineDistance(prev.lat, prev.lng, curr.lat, curr.lng)
    totalDistance += segmentDist
    // --- Elevation ---
    if (prev.ele != null && curr.ele != null) {
      const eleDiff = curr.ele - prev.ele
      if (eleDiff > ELEVATION_NOISE_THRESHOLD) {
        elevationGain += eleDiff
      } else if (eleDiff < -ELEVATION_NOISE_THRESHOLD) {
        elevationLoss += Math.abs(eleDiff)
      }
    }
    // --- Speed ---
    if (prev.time && curr.time) {
      const timeDiffSeconds = (curr.time.getTime() - prev.time.getTime()) / 1000
      if (timeDiffSeconds > 0) {
        const segmentSpeed = segmentDist / timeDiffSeconds // m/s
        if (segmentSpeed > maxSpeed) maxSpeed = segmentSpeed
      }
    }
  }

  const startTime = points[0].time
  const endTime = points[points.length - 1].time
  const totalDuration =
    startTime && endTime
      ? (endTime.getTime() - startTime.getTime()) / 1000
      : 0

  return {
    totalDistanceMeters: Math.round(totalDistance),
    totalDurationSeconds: Math.round(totalDuration),
    elevationGainMeters: Math.round(elevationGain),
    elevationLossMeters: Math.round(elevationLoss),
    maxSpeedMps: parseFloat(maxSpeed.toFixed(3)),
    startTime,
    endTime,
  }
}