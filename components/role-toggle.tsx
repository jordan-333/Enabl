"use client"

import { useUser } from "./user-context"

export function RoleToggle() {
  const { userRole, setUserRole } = useUser()

  return (
    <div className="bg-muted/50 border-b px-4 py-2 flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Currently viewing as: <span className="font-medium text-foreground capitalize">{userRole}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setUserRole("setter")}
          className={`px-3 py-1 text-xs rounded-full ${
            userRole === "setter" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          Setter View
        </button>
        <button
          onClick={() => setUserRole("closer")}
          className={`px-3 py-1 text-xs rounded-full ${
            userRole === "closer" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          Closer View
        </button>
        <button
          onClick={() => setUserRole("manager")}
          className={`px-3 py-1 text-xs rounded-full ${
            userRole === "manager" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          Manager View
        </button>
      </div>
    </div>
  )
}
