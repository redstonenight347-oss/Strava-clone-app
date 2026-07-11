import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import {
  parserGPX,
  computeStats,
  douglasPeucker,
  encodePolyline,
  buildStreams
} from "@repo/gpx"
import { CreateActivityFromGpx, CreateActivityStreams } from "@repo/db"

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const formData = await req.formData()
    const file = formData.get("file") as File | null
    if (!file || file.name.endsWith(".gpx")) {
      return NextResponse.json({ error: "A valild .gpx file is requried" }, { status: 400 })
    }

    const xmlString = await file.text()

    const rawPoints = parserGPX(xmlString)
    if (rawPoints.length === 0) {
      return NextResponse.json({ error: "No track points from the file" }, { status: 422 })
    }

    const stats = computeStats(rawPoints)
    const simplified = douglasPeucker(rawPoints, 0.0001)
    const encodedPolyline = encodePolyline(simplified)
    const streams = buildStreams(rawPoints)

    const activity = await CreateActivityFromGpx({
      userId: session.user.id,
      type: "Run", // or detect from GPX <type> tag
      title: file.name.replace(".gpx", ""),
      distance: stats.totalDistanceMeters,
      duration: stats.totalDurationSeconds,
      elevationGain: stats.elevationGainMeters,
      elevationLoss: stats.elevationLossMeters,
      date: (stats.startTime ?? new Date()).toISOString().split("T")[0],
      time: (stats.startTime ?? new Date()).toISOString().split("T")[1].slice(0, 8),
      encodedPolyline,
      avgSpeedMps: stats.avgSpeedMps,
      maxSpeedMps: stats.maxSpeedMps,
    })

    await CreateActivityStreams({
      activityId: activity.activityId,
      streams,
    })


    return Response.json({ activityId: activity.activityId }, { status: 201 })
  }
  catch (err) {
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}