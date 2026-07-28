import { auth } from "@/lib/auth"
import { getActivityDetails } from "@repo/db"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


export default async function Activity({ params }: { params: Promise<{ id: string }> }) {

  const session = await auth.api.getSession({
    headers: await headers()
  })
  if(!session) {
    redirect("/auth")
  }

  const { id: activityId } = await params
  const data = await getActivityDetails(activityId)
  console.log(data)
  
  return (
    <div>
      {data? 
        <div>data available</div>
        : <div>no data</div> }
    </div>
  )
}