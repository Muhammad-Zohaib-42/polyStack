"use client"

import { useAuthContext } from "@/contexts/AuthContext"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useState, useRef, useEffect } from "react"
import toast from "react-hot-toast"
import { ClipLoader } from "react-spinners"

const Page = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const {user, setUser} = useAuthContext()
  const router = useRouter()
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    if (e.target.value.length > 0 && !Number(e.target.value)) return

    setOtp(prev => prev.map((digit, index) => {
      if (i == index) {
        return e.target.value.slice(-1)
      }

      return digit
    }))

    setActiveIndex((prev) => {
      if (prev < otp.length - 1 && e.target.value.length > 0) {
        return prev + 1
      }
      return prev
    })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Backspace" && activeIndex > 0 && e.currentTarget.value.trim() === "") {
      setActiveIndex(prev => prev - 1)
    }
  }

  function handleInputFocus(index: number) {
    setActiveIndex(index)
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasteValue = e.clipboardData.getData("text")
    setOtp(pasteValue.trim().split(""))
    setActiveIndex(otp.length - 1)
  }

  useEffect(() => {
    inputsRef.current[activeIndex]?.focus()
  }, [activeIndex])

  useEffect(() => {
    toast(`Verify your email. We've sent a 6-digit code to ${user?.email}. Enter it below`)
  }, [])

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const isEmpty = otp.some(field => field.trim() == "")

    if (isEmpty) {
      toast.error("All fields are required")
    }

    try {
      setLoading(true)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify-email`, {otp: otp.join(""), email: user?.email}, {withCredentials: true})
      if(response.data.success){
        setUser({...response.data.data.user, isLogin: true})
        localStorage.setItem("user", JSON.stringify({...response.data.data.user, isLogin: true}))
        toast.success("Email verified successfully")
        router.push("/")
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <main className="h-dvh flex items-center justify-center">
      <form onSubmit={submitHandler} className="flex flex-col gap-2 w-full max-w-76 py-5 px-7 pb-6 bg-white rounded-md shadow-md">
        <div className="flex items-center gap-1">
          {
            otp.map((digit, index) => <input ref={(input) => {inputsRef.current[index] = input}} className="outline-none border border-neutral-300 w-[calc((100%/6))] aspect-square rounded focus:border-emerald-300 transition-all duration-300 text-center text-xl" key={index} type="text" value={digit} onChange={(e) => handleInputChange(e, index)} onKeyDown={handleKeyDown} onFocus={() => handleInputFocus(index)} onPaste={handlePaste} />)
          }
        </div>
        <button disabled={loading} className="flex items-center justify-center gap-1 px-2 py-1 rounded cursor-pointer bg-emerald-500 text-slate-100 transition-all duration-300 hover:bg-emerald-600 focus:bg-emerald-600 w-full mt-1 outline-none disabled:cursor-not-allowed disabled:opacity-50" type="submit">
          {loading && <ClipLoader color="white" size={16} />}
          <span>Verify Email</span>
        </button>
      </form>
    </main>
  )
}

export default Page