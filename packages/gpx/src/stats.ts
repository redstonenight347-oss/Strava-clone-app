import { haversineDistance } from "./haversine"
import { RawTrackpoint } from "./parser"

export type ActivityStats = {
  totalDistanceMeters: number,
  totalDurationSeconds: number,
  elevationGainMeters: number,
  elevationLossMeters: number,
  avgSpeedMps: number,
  maxSpeedMps: number,
  avgPaceSecPerKm: number,
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
      avgSpeedMps: 0,
      maxSpeedMps: 0,
      avgPaceSecPerKm: 0,
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
  const avgSpeed = totalDuration > 0 ? totalDistance / totalDuration : 0
  // Pace in sec/km: if avg speed is 3 m/s → pace = 1000/3 = 333 sec/km ≈ 5:33/km
  const avgPace = avgSpeed > 0 ? 1000 / avgSpeed : 0

  return {
    totalDistanceMeters: Math.round(totalDistance),
    totalDurationSeconds: Math.round(totalDuration),
    elevationGainMeters: Math.round(elevationGain),
    elevationLossMeters: Math.round(elevationLoss),
    avgSpeedMps: parseFloat(avgSpeed.toFixed(3)),
    maxSpeedMps: parseFloat(maxSpeed.toFixed(3)),
    avgPaceSecPerKm: Math.round(avgPace),
    startTime,
    endTime,
  }
}