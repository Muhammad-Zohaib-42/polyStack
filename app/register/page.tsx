"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { Camera, Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

interface FormData {
  name: string,
  email: string,
  password: string
}

const Page = () => {
  const [avatarUi, setAvatarUi] = useState("/download.png");
  const [avatar, setAvatar] = useState<File | null>(null)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const router = useRouter()

  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormData>()
  const {setUser} = useAuthContext()
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleCameraClick() {
    fileInputRef.current?.click();
  }

  function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(file)
    setAvatarUi(URL.createObjectURL(file));
  }

  async function submitHandler(data: FormData) {
    setIsFormSubmitted(true)
    if (!avatar) return

    const formData = new FormData()

    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("avatar", avatar)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`, formData, {withCredentials: true})
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify({...response.data.data.user, isLogin: false}))
        setUser({...response.data.data.user, isLogin: false})
        router.push("/verify-email")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="h-dvh flex items-center justify-center">
      <form onSubmit={handleSubmit(submitHandler)} className="relative flex flex-col gap-2 w-full max-w-76 py-5 px-7 pb-6 bg-white rounded-md shadow-md">
        <div className={`relative h-18 w-18 rounded-full bg-slate-100 mx-auto border ${(isFormSubmitted && !avatar) ? "border-rose-500" : "border-transparent"}`}>
          <Image
            src={avatarUi}
            alt="profile image"
            fill
            className="object-cover rounded-full"
          />
          <button
            onClick={handleCameraClick}
            type="button"
            className="absolute right-0 bottom-0 cursor-pointer bg-emerald-500 rounded-full h-6 w-6 flex items-center justify-center"
          >
            <Camera size={15} color="white" />
          </button>
          <input
            onChange={handleFileInputChange}
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
          />
        </div>
        {isFormSubmitted && !avatar && <p className="text-rose-500 absolute top-0 left-0 text-sm w-full text-center">Required</p>}
        <div className="flex flex-col gap-0.75">
          <div className="flex flex-col gap-0.5 relative">
            <label htmlFor="name">Name</label>
            <input
              className={`bg-white px-2 py-1 outline-none border ${errors.name ? "border-rose-500" : "border-neutral-300 focus:border-emerald-300"} transition-all duration-300 rounded`}
              type="text"
              id="name"
              {...register("name", {required: "Name is required"})}
            />
            {errors.name && <p className="text-rose-500 absolute top-0 right-0">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col gap-0.5 relative">
            <label htmlFor="email">Email</label>
            <input
              className={`bg-white px-2 py-1 outline-none border ${errors.email ? "border-rose-500" : "border-neutral-300 focus:border-emerald-300"} transition-all duration-300 rounded`}
              type="email"
              id="email"
              {...register("email", {required: "Email is required", pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email"}})}
            />
            {errors.email && <p className="text-rose-500 absolute top-0 right-0">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-0.5 relative">
            <label htmlFor="password">Password</label>
            <input
              className={`bg-white px-2 py-1 outline-none border ${errors.password ? "border-rose-500" : "border-neutral-300 focus:border-emerald-300"} transition-all duration-300 rounded`}
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              {...register("password", {required: "Password is required", minLength: {value: 6, message: "6+ characters required"}})}
            />
            {errors.password && <p className="text-rose-500 absolute top-0 right-0">{errors.password.message}</p>}
            <button onClick={() => setIsPasswordVisible(!isPasswordVisible)} type="button" className="absolute right-2 top-[56%] cursor-pointer">
              {!isPasswordVisible && <Eye size={18} color="gray" />}
              {isPasswordVisible && <EyeClosed size={18} color="gray" />}
            </button>
          </div>
        </div>
        <button
          disabled={isSubmitting}
          className="flex items-center justify-center gap-1 px-2 py-1 rounded cursor-pointer bg-emerald-500 text-slate-100 transition-all duration-300 hover:bg-emerald-600 focus:bg-emerald-600 w-full mt-1 outline-none disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
        >
          {isSubmitting && <ClipLoader color="white" size={16} />}
          <span>Register</span>
        </button>
        <p className="text-sm">
          Already have an account{" "}
          <Link
            className="text-emerald-600 hover:text-emerald-700 transition-all outline-none focus:text-emerald-700"
            href="/login"
          >
            Login
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Page;
