import { getActivitiesByUser } from "@repo/db"
import ActivityCard from "@/components/ActivityCard"

//TODO: create a root types then import it from there
export type OverviewType = {
  id: number,
  name: string,
  value: number
}


export default async function Dashboard() {
  //TODO: should pass the jwt rather than raw number
  // const activities = await getActivitiesByUser(1); 

  //the values will come from the db and change the object layout
  const overview: OverviewType[] = [
    { 
      id: 0,
      name: "Distance", 
      value: 77.7 //in meters
    },{ 
      id: 1,
      name: "Elev Gain", 
      value: 10 //in meters
    },{ 
      id: 2,
      name: "Time", 
      value: 25 //in seconds
    }  
  ]

  return (
    <div>
      <ActivityCard overview={overview} />
    </div>
  )
}

