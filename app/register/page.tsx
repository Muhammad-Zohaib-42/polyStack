"use client"

import { Camera } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ChangeEvent, useRef, useState } from "react"

const Page = () => {
  const [avatar, setAvatar] = useState("/download.png")

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  function handleCameraClick() {
    fileInputRef.current?.click()
  }

  function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatar(URL.createObjectURL(file))
  }

  return (
    <main className="h-dvh flex items-center justify-center">
      <form className="flex flex-col gap-2 w-full max-w-76 py-5 px-7 pb-6 bg-white rounded-md shadow-md">
        <div className="relative h-18 w-18 rounded-full bg-slate-100 mx-auto">
          <Image src={avatar} alt="profile image" fill className="object-cover rounded-full" />
          <button onClick={handleCameraClick} type="button" className="absolute right-0 bottom-0 cursor-pointer bg-emerald-500 rounded-full h-6 w-6 flex items-center justify-center">
            <Camera size={15} color="white" />
          </button>
          <input onChange={handleFileInputChange} ref={fileInputRef} type="file" className="hidden" accept="image/*" />
        </div>
        <div className="flex flex-col gap-0.75">
          <div className="flex flex-col gap-0.5">
            <label htmlFor="name">Name</label>
            <input className="bg-white px-2 py-1 outline-none border border-neutral-300 focus:border-emerald-300 transition-all duration-300 rounded" type="text" id="name" />
          </div>
          <div className="flex flex-col gap-0.5">
            <label htmlFor="email">Email</label>
            <input className="bg-white px-2 py-1 outline-none border border-neutral-300 focus:border-emerald-300 transition-all duration-300 rounded" type="email" id="email" />
          </div>
          <div className="flex flex-col gap-0.5">
            <label htmlFor="password">Password</label>
            <input className="bg-white px-2 py-1 outline-none border border-neutral-300 focus:border-emerald-300 transition-all duration-300 rounded" type="password" id="password" />
          </div>
        </div>
        <button className="px-2 py-1 rounded cursor-pointer bg-emerald-500 text-slate-100 transition-all duration-300 hover:bg-emerald-600 focus:bg-emerald-600 w-full mt-1 outline-none" type="submit">Register</button>
        <p className="text-sm">Already have an account <Link className="text-emerald-600 hover:text-emerald-700 transition-all outline-none focus:text-emerald-700" href="/login">Login</Link></p>
      </form>
    </main>
  )
}

export default Page