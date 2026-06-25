import ActivityCard from "@/components/ActivityCard"
import { getActivitiesByUser } from "@repo/db"
import { ActivityType } from "@repo/types"
//TODO: create a root types then import it from there


export default async function Dashboard() {
  try {
    const activities = await getActivitiesByUser(1)

    console.log(activities)
    return (
      <div>
        {activities.map((a: ActivityType) => (<ActivityCard key={a.activityId} activities={a} />))}
      </div>
    )
  }
  catch (err) {
    console.log(err)
  }

}

