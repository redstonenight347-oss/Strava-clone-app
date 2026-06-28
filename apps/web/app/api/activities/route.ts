import { getActivitiesByUser } from "@repo/db"
import { NextRequest, NextResponse } from "next/server"


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
  catch(err) {
    console.log(err)
    return NextResponse.json({error: err}, {status: 500})
  }
}