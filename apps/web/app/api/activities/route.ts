import { CreateActivity, getActivitiesByUser } from "@repo/db"
import { NextRequest, NextResponse } from "next/server"
import { CreateActivitySchema, MetaDataSchema } from "@repo/validation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { toMeters, durationToSeconds, toElevationMeters } from "@/lib/utils/units"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const userId: any = searchParams.get("userId")
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 })
    }

    const page = Number(searchParams.get("page") ?? 0)
    const limit = Number(searchParams.get("limit") ?? 5)
    const offset = page * limit
    const data = await getActivitiesByUser(userId, limit, offset)

    return NextResponse.json(data)
  }
  catch (err) {
    console.log(err)
    return NextResponse.json({ error: err }, { status: 500 })
  }
}


export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const { data, metaData } = await req.json()

    const DataSuccess = CreateActivitySchema.safeParse(data)
    const MetaDataSuccess = MetaDataSchema.safeParse(metaData)

    if (!DataSuccess.success || !MetaDataSuccess.success) {
      return NextResponse.json({ error: "Invalid Input" }, { status: 400 })
    }

    const dbPayload = {
      userId: userId,
      type: DataSuccess.data.type,
      title: DataSuccess.data.title,
      description: DataSuccess.data.description,
      date: DataSuccess.data.date,
      time: DataSuccess.data.time,
      distance: toMeters(DataSuccess.data.distance, MetaDataSuccess.data.distanceUnit),
      duration: durationToSeconds(DataSuccess.data.duration),
      elevation: toElevationMeters(DataSuccess.data.elev, MetaDataSuccess.data.elevUnit),
    }

    await CreateActivity(dbPayload)

    return NextResponse.json({ success: true }, { status: 200 })
  }
  catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }

}