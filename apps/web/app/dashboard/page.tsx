import ActivityFeed from "@/components/ActivityFeed"
import { auth } from "@/lib/auth"
import { getActivitiesByUser } from "@repo/db"
import { headers } from "next/headers"
//TODO: create a root types then import it from there


export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  try {
    const initialActivities = await getActivitiesByUser(1, 5, 0)

    return <ActivityFeed initialActivities={initialActivities} />
  }
  catch (err) {
    console.log(err)
  }

}

