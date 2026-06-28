import ActivityFeed from "@/components/ActivityFeed"
import { auth } from "@/lib/auth"
import { getActivitiesByUser } from "@repo/db"
import { headers } from "next/headers"
import Link from "next/link"
//TODO: create a root types then import it from there


export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  try {
    const initialActivities = await getActivitiesByUser(1, 5, 0)

    return (
      <div>
        <div className="flex justify-end">
          <Link
          href={"/upload"}
          className="m-4 px-6 py-4 bg-stravaorange text-white text-xl rounded-xl"
          >Upload Activitiy</Link>
        </div>
        <ActivityFeed initialActivities={initialActivities} />
      </div>

    )
  }
  catch (err) {
    console.log(err)
  }

}

