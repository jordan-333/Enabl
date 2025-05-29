"use client"

import { useUser } from "./user-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Users } from "lucide-react"

export function RoleSelector() {
  const { userRole, setUserRole } = useUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Users className="h-4 w-4" />
          <span>Role: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setUserRole("setter")}>Setter</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setUserRole("closer")}>Closer</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setUserRole("manager")}>Manager</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
