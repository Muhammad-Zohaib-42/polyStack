"use client"

import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface PropType {
  children: React.ReactNode
}

interface UserType {
  _id: string,
  name: string,
  email: string,
  avatar: string,
  isVerified: boolean,
  isLogin: boolean
}

interface ContextType {
  user: UserType | null,
  setUser: Dispatch<SetStateAction<UserType | null>>
}

const AuthContext = createContext<ContextType | null>(null)

export function AuthProvider({children}: PropType) {
  const [user, setUser] = useState<UserType | null>(() => {
    const userJson = typeof window !== "undefined" && localStorage?.getItem("user")

    if (userJson) {
      return JSON.parse(userJson)
    } else {
      return null
    }
  })

  return <AuthContext.Provider value={{user, setUser}}>
    {children}
  </AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider")
  }

  return context
}