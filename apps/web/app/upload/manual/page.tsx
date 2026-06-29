"use client"

import { useState } from "react"

export default function Manual() {
  const [data, setData] = useState({
    distance: 0,
    duration: {},
    elev: 0,
    type: "",
    date: new Date(),
    title: "",
    description: "", 
  })
  

  const update = (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setData(prev => ({ ...prev, [field]: e.target.value }))

  return (
    <div className="w-200 h-full bg-stone-200">
      <h1 className="text-6xl font-medium">Manual entry</h1>
      <form>
        <p>Distance</p>
        <input 
          id="distance"
          type="number"
          onChange={update("distance")}
          className="p-2 bg-white rounded-xl"
        />
      </form>
    </div>
  )
}