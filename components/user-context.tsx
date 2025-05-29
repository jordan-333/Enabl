"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type UserRole = "setter" | "closer" | "manager"

interface UserContextType {
  userRole: UserRole
  setUserRole: (role: UserRole) => void
  userName: string
  setUserName: (name: string) => void
  isNewAccount: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>("closer")
  const [userName, setUserName] = useState<string>("Alex Johnson")

  // Load saved role and name from localStorage on client side
  useEffect(() => {
    console.log("UserProvider: Loading saved user data from localStorage")
    const savedRole = localStorage.getItem("enabl-user-role") as UserRole | null
    const savedName = localStorage.getItem("enabl-user-name") as string | null
    console.log("UserProvider: Loaded data:", { savedRole, savedName })
    if (savedRole) {
      setUserRole(savedRole)
    }
    if (savedName) {
      setUserName(savedName)
    }
  }, [])

  // Save role and name to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("UserProvider: Saving user data to localStorage:", { userRole, userName })
      localStorage.setItem("enabl-user-role", userRole)
      localStorage.setItem("enabl-user-name", userName)
    }
  }, [userRole, userName])

  // Add this function to detect if account has data
  const isNewAccount = () => {
    if (typeof window === "undefined") return false
    const isDemoAccount = userName === "Alex Johnson"
    const isJordanAccount = userName === "Jordan Chrisostomou"
    console.log("UserProvider: Checking account type:", {
      userName,
      isDemoAccount,
      isJordanAccount,
      isNew: !isDemoAccount // Any account that is not the demo account is new
    })
    // Demo account should show full data
    // All other accounts (including Jordan's) should be treated as new (show placeholders)
    return !isDemoAccount
  }

  return (
    <UserContext.Provider
      value={{
        userRole,
        setUserRole,
        userName,
        setUserName,
        isNewAccount: isNewAccount(),
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
