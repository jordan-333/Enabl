"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

interface LogoutButtonProps {
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function LogoutButton({ variant = "ghost", size = "sm", className }: LogoutButtonProps) {
  const router = useRouter()

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem("enabl-authenticated")
    localStorage.removeItem("enabl-user-email")
    localStorage.removeItem("enabl-user-role")

    // Redirect to login page
    router.push("/login")
  }

  return (
    <Button variant={variant} size={size} onClick={handleLogout} className={className}>
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  )
}
