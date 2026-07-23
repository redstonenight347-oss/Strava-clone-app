import ActivityFeed from "@/components/ActivityFeed"  
import { auth } from "@/lib/auth"
import { createUserPreferences, getActivitiesByUser, getUserPreferences } from "@repo/db"
import { headers } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"


export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if(!session) {
    redirect("/auth")
  }

  const userId = session?.user.id

  try {
    const initialActivities = await getActivitiesByUser(session?.user.id, 5, 0)
    let [userPreferences] = await getUserPreferences(session?.user.id)

    if(!userPreferences) {
      [userPreferences] = await createUserPreferences(session.user.id)
    }

    return (
      <div>
        <div className="flex justify-end">
          <Link
          href={"/upload"}
          className="m-4 px-6 py-4 bg-stravaorange text-white text-xl rounded-xl"
          >Upload Activitiy</Link>
        </div>
        <ActivityFeed initialActivities={initialActivities} userPreferences={userPreferences} userId={userId} />
      </div>

    )
  }
  catch (err) {
    console.log(err)
  }

}

