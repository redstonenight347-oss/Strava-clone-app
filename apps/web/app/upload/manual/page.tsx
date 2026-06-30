"use client"

import { useState } from "react"

const SPORTS = [
  "Run", "Ride", "Swim", "Walk", "Hike", "Other"
]

// const TAGS = ["Race", "Workout", "Long Run", "Commute", "For a Cause", "Recovery", "With Kid", "With Pet", "Treadmill"]

export default function Manual() {
  const [data, setData] = useState({
    distance: 0,
    duration: { hr: 1, min: 0, sec: 0 },
    elev: 0,
    type: "Run",
    date: new Date().toISOString().slice(0, 10),
    time: "11:00",
    title: "",
    description: "",
  })


  // const [selectedTags, setSelectedTags] = useState<string[]>([])

  const [metaData, setMetaData] = useState<{
    distanceUnit: "kilometers" | "miles"
    elevUnit: "meters" | "feet"
  }>({
    distanceUnit: "kilometers",
    elevUnit: "meters",
  })

  const updateField = (field: string, value: unknown) =>
    setData(prev => ({ ...prev, [field]: value }))

  const updateMetaData = (field: keyof typeof metaData, value: string) =>
    setMetaData(prev => ({ ...prev, [field]: value }))

  const updateDuration = (key: "hr" | "min" | "sec", value: number) =>
    setData(prev => ({ ...prev, duration: { ...prev.duration, [key]: value } }))

  // const toggleTag = (tag: string) =>
  //   setSelectedTags(prev =>
  //     prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
  //   )

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: data, metaData: metaData })
      })

      const resData = await res.json()

      console.log(resData)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full max-w-4xl px-4 py-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Manual Entry</h1>

      <form onSubmit={submitHandler} autoComplete="off" className="space-y-0">

        {/* Row 1: Distance, Duration, Elevation */}
        <div className="flex flex-wrap gap-8 pb-6 border-b border-gray-200">

          {/* Distance */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-600">Distance</label>
            <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden h-9">
              <input
                id="distance"
                type="number"
                min={0}
                value={data.distance || ""}
                onChange={e => updateField("distance", parseFloat(e.target.value))}
                className="w-24 px-2 h-full text-sm outline-none text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <div className="h-full w-px bg-gray-200" />
              <select
                value={metaData.distanceUnit}
                onChange={e => updateMetaData("distanceUnit", e.target.value)}
                className="h-full px-2 pr-1 text-sm bg-white outline-none cursor-pointer"
              >
                <option value="kilometers">kilometers</option>
                <option value="miles">miles</option>
              </select>
            </div>
          </div>

          {/* Duration */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-600">Duration</label>
            <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden h-9">
              <input
                id="duration-hr"
                type="number"
                min={0}
                value={data.duration.hr}
                onChange={e => updateDuration("hr", parseInt(e.target.value) || 0)}
                className="w-10 px-1 h-full text-sm outline-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-xs text-gray-400 pr-2">hr</span>
              <div className="h-full w-px bg-gray-200" />
              <input
                id="duration-min"
                type="number"
                min={0}
                max={59}
                value={data.duration.min}
                onChange={e => updateDuration("min", parseInt(e.target.value) || 0)}
                className="w-10 px-1 h-full text-sm outline-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-xs text-gray-400 pr-2">min</span>
              <div className="h-full w-px bg-gray-200" />
              <input
                id="duration-sec"
                type="number"
                min={0}
                max={59}
                value={data.duration.sec}
                onChange={e => updateDuration("sec", parseInt(e.target.value) || 0)}
                className="w-10 px-1 h-full text-sm outline-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Elevation */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-600">Elevation</label>
            <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden h-9">
              <input
                id="elevation"
                type="number"
                min={0}
                value={data.elev || ""}
                onChange={e => updateField("elev", parseFloat(e.target.value))}
                className="w-24 px-2 h-full text-sm outline-none text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <div className="h-full w-px bg-gray-200" />
              <select
                value={metaData.elevUnit}
                onChange={e => updateMetaData("elevUnit", e.target.value)}
                className="h-full px-2 pr-1 text-sm bg-white outline-none cursor-pointer"
              >
                <option value="meters">meters</option>
                <option value="feet">feet</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 2: Sport, Date & Time */}
        <div className="flex flex-wrap gap-8 py-6 border-b border-gray-200">

          {/* Sport */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-600">Sport</label>
            <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden h-9">
              <select
                id="sport"
                value={data.type}
                onChange={e => updateField("type", e.target.value)}
                className="h-full px-3 pr-8 text-sm bg-white outline-none cursor-pointer min-w-40"
              >
                {SPORTS.map(sport => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-600">Date &amp; Time</label>
            <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden h-9">
              <input
                id="date"
                type="date"
                value={data.date}
                onChange={e => updateField("date", e.target.value)}
                className="h-full px-2 text-sm bg-white outline-none cursor-pointer"
              />
              <div className="h-full w-px bg-gray-200" />
              <input
                id="time"
                type="time"
                value={data.time}
                onChange={e => updateField("time", e.target.value)}
                className="h-full px-2 text-sm bg-white outline-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1.5 py-6">
          <label htmlFor="title" className="text-xs text-gray-600">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Lunch Run"
            value={data.title}
            onChange={e => updateField("title", e.target.value)}
            className="w-96 h-9 px-3 text-sm border border-gray-300 rounded bg-white outline-none focus:border-blue-400 placeholder:text-gray-400"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5 pb-6 border-b border-gray-200">
          <label htmlFor="description" className="text-xs text-gray-600">Description</label>
          <textarea
            id="description"
            placeholder="How'd it go? Share more about your activity and use @ to tag someone."
            value={data.description}
            onChange={e => updateField("description", e.target.value)}
            rows={5}
            className="w-96 px-3 py-2 text-sm border border-gray-300 rounded bg-white outline-none focus:border-blue-400 placeholder:text-gray-400 resize-y"
          />
        </div>

        {/* Tags */}
        {/* <div className="flex flex-col gap-2 pt-6">
          <label className="text-xs text-gray-600">Tags</label>
          <div className="flex flex-wrap gap-2">
            {TAGS.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`flex items-center gap-1.5 px-3 py-1 text-sm rounded-full border transition-colors cursor-pointer
                  ${selectedTags.includes(tag)
                    ? "border-orange-500 text-orange-600 bg-orange-50"
                    : "border-gray-300 text-gray-700 bg-white hover:border-gray-400"
                  }`}
              >
                <span className={`w-2 h-2 rounded-full border ${selectedTags.includes(tag) ? "border-orange-500 bg-orange-500" : "border-gray-400"}`} />
                {tag}
              </button>
            ))}
          </div>
        </div> */}

        {/* Submit button */}
        <div className="pt-6">
          <button
            type="submit"
            className="px-8 py-2.5 bg-stravaorange text-white text-sm font-semibold rounded-md
              hover:brightness-90 active:scale-[0.97] transition-all duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stravaorange focus-visible:ring-offset-2
              cursor-pointer"
          >
            Save Activity
          </button>
        </div>
      </form>
    </div>
  )
}