"use client"

import React, { useState, useRef, useEffect } from "react"

const Page = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [activeIndex, setActiveIndex] = useState(0)

  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    if (e.target.value.length > 0 && !Number(e.target.value)) return

    setOtp(prev => prev.map((digit, index) => {
      if (i == index) {
        return e.target.value
      }

      return digit
    }))

    setActiveIndex((prev) => {
      if (prev < otp.length - 1) {
        return prev + 1
      }
      return prev
    })
  }

  useEffect(() => {
    inputsRef.current[activeIndex]?.focus()
  }, [activeIndex])

  return (
    <main className="h-dvh flex items-center justify-center">
      <form className="flex flex-col gap-2 w-full max-w-76 py-5 px-7 pb-6 bg-white rounded-md shadow-md">
        <div className="flex items-center gap-1">
          {
            otp.map((digit, index) => <input ref={(input) => {inputsRef.current[index] = input}} className="outline-none border border-neutral-300 w-[calc((100%/6))] aspect-square rounded focus:border-emerald-300 transition-all duration-300 text-center text-xl" key={index} type="text" value={digit} onChange={(e) => handleInputChange(e, index)} />)
          }
        </div>
        <button className="px-2 py-1 rounded cursor-pointer bg-emerald-500 text-slate-100 transition-all duration-300 hover:bg-emerald-600 focus:bg-emerald-600 w-full mt-1 outline-none" type="submit">Verify Email</button>
      </form>
    </main>
  )
}

export default Page