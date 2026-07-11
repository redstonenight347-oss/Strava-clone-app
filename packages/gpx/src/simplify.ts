import { RawTrackpoint } from "./parser"

/**
 * Perpendicular distance from point P to the line segment AB.
 * Used internally by Douglas-Peucker.
 */

function perpendicularDistance(
  p: { lat: number; lng: number },
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const dx = b.lng - a.lng
  const dy = b.lat - a.lat
  // Line length squared
  const lineLenSq = dx * dx + dy * dy

  if (lineLenSq === 0) {
    // a and b are the same point — return distance to a
    const ex = p.lng - a.lng
    const ey = p.lat - a.lat
    return Math.sqrt(ex * ex + ey * ey)
  }

  // Project point onto line, clamped to segment [0,1]
  const t = Math.max(0, Math.min(1, ((p.lng - a.lng) * dx + (p.lat - a.lat) * dy) / lineLenSq))
  const closestLng = a.lng + t * dx
  const closestLat = a.lat + t * dy
  const ex = p.lng - closestLng
  const ey = p.lat - closestLat

  return Math.sqrt(ex * ex + ey * ey)
}


/**
 * Recursive Douglas-Peucker path simplification.
 *
 * epsilon: tolerance in degrees. 
 *   - 0.00001 ≈ ~1 metre → very high detail
 *   - 0.0001  ≈ ~10 metres → good for route preview maps  ← recommended default
 *   - 0.001   ≈ ~100 metres → thumbnail/overview maps
 *
 * Usable in: Web, React Native (simplify for different zoom levels)
 */
export function douglasPeucker(
  points: RawTrackpoint[],
  epsilon: number = 0.0001
): RawTrackpoint[] {
  if (points.length <= 2) return points

  // Find the point with the maximum distance from the line start→end
  let maxDist = 0
  let maxIndex = 0
  const start = points[0]
  const end = points[points.length - 1]

  for (let i = 1; i < points.length - 1; i++) {
    const dist = perpendicularDistance(points[i], start, end)
    if (dist > maxDist) {
      maxDist = dist
      maxIndex = i
    }
  }

  // If the max deviation is above epsilon, recursively simplify both halves
  if (maxDist > epsilon) {
    const left = douglasPeucker(points.slice(0, maxIndex + 1), epsilon)
    const right = douglasPeucker(points.slice(maxIndex), epsilon)
    // Merge: remove the duplicate point at the junction
    return [...left.slice(0, -1), ...right]
  }
  // All intermediate points are within tolerance — keep only endpoints
  
  return [start, end]
}