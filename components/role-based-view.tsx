"use client"

import type React from "react"
import { useUser } from "./user-context"

type UserRole = "setter" | "closer" | "manager"

interface RoleBasedViewProps {
  setterView: React.ReactNode
  closerView: React.ReactNode
  managerView: React.ReactNode
  defaultRole?: UserRole
}

export function RoleBasedView({ setterView, closerView, managerView, defaultRole = "closer" }: RoleBasedViewProps) {
  // Get the user role from context
  const { userRole } = useUser()

  // Render the appropriate view based on user role
  const renderView = () => {
    switch (userRole) {
      case "setter":
        return setterView
      case "closer":
        return closerView
      case "manager":
        return managerView
      default:
        return closerView
    }
  }

  return (
    <div className="flex flex-col w-full">
      {/* Render the appropriate view */}
      {renderView()}
    </div>
  )
}
