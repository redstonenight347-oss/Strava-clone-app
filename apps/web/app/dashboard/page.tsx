import ActivityFeed from "@/components/ActivityFeed"
import { getActivitiesByUser } from "@repo/db"
//TODO: create a root types then import it from there


export default async function Dashboard() {
  try {
    const initialActivities = await getActivitiesByUser(1, 10, 0)

    return <ActivityFeed initialActivities={initialActivities} />
  }
  catch (err) {
    console.log(err)
  }

}

