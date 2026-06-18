import { getActivitiesByUser } from "@repo/db"

export default async function dashboard() {
//TODO: should pass the jwt rather than raw number
  const activities = await getActivitiesByUser(1); 

  return (
    <div>
      <h1>My Activities</h1>

      {activities.length === 0 && <p>No activities yet</p>}

      {activities.map((activity) => (
        <div key={activity.activityId}>
          <h2>Title: {activity.title ?? "Untitled"}</h2>
          <p>{activity?.description}</p>
          <p>Type: {activity.type}</p>
          <p>Distance: {activity.distance}Km</p>
          <p>Duration: {activity.duration}mins</p>
        </div>
      ))}
    </div>
  )
}