"use client"

import Link from "next/link"


export default function UploadButton() {
  return (
    <div className="w-48 flex flex-col border">
        <Link 
        href={"/upload/manual"}
        className="p-2 text-xl border-b">Manual</Link>
        <Link 
        href={"/upload/file"}
        className="p-2 text-xl">GPX file</Link>
        {/* More coming soon */}
      </div>
  )
}
