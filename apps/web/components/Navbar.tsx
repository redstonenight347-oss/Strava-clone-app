"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

type MenuType = {
  name: string,
  href: string
}

// Add paths to show which are all pages getting the join button
const showPathName = ['/']

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const showJoinBtn = showPathName.includes(pathname)

  return (
    <nav className="px-4 w-full h-18 bg-amber-100 flex items-center justify-between lg:px-6 sticky top-0 z-50">
      <div className="flex items-center">
        <button
          className="pr-4 text-4xl cursor-pointer lg:hidden text-black"
          onClick={() => setIsOpen(prev => !prev)}>☰</button>

        <div className="flex items-center justify-between">
          <h1 className=" text-4xl text-stravaorange font-medium">Strava Clone</h1>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="hidden lg:flex lg:items-center">
          <NavContents />
        </div>

        {showJoinBtn && 
          <Link
            href="/auth"
            className="py-0.5 px-2 text-2xl border-2 text-stravaorange border-stravaorange rounded-md cursor-pointer font-medium">Join</Link>

        }
      </div>
      
      
      {
          isOpen && (
            <div className="p-4 w-80 h-full flex items-start lg:hidden bg-orange-300 top-0 left-0 fixed">

              <div className="flex">
                <button
                  className="pr-5 text-5xl cursor-pointer text-black"
                  onClick={() => setIsOpen(prev => !prev)}>x</button>
              </div>

              <div className="my-24 flex flex-col h-[80%] gap-8">
                <NavContents />
              </div>


            </div>
          )
        }
    </nav>
  )
}


function NavContents() {
  const menus: MenuType[] = [
    { name: "Home", href: "/"},
    { name: "Dashboard", href: "/dashboard"},
    { name: "Maps", href: "/maps"},
  ]

  return (
    <>
      {menus.map((m) => <Link
        key={m.name}
        href={m.href}
        className="pr-5 text-2xl lg:text-lg cursor-pointer text-black"
      >{m.name}</Link>
      )}
    </>
  )
}