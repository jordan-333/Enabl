"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Home,
  Lightbulb,
  LogOut,
  Menu,
  Phone,
  Settings,
  User,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Logo } from "@/components/logo"
import { NotificationsPopover } from "@/components/notifications-popover"
import { FeatureSuggestionModal } from "@/components/feature-suggestion-modal"
import { RoleToggle } from "@/components/role-toggle"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

// Cookie name for persisting sidebar state
const SIDEBAR_STATE_COOKIE = "enabl-sidebar-state"

// Suppress ResizeObserver errors
if (typeof window !== "undefined") {
  const resizeObserverErrorHandler = (e: ErrorEvent) => {
    if (e.message === "ResizeObserver loop completed with undelivered notifications.") {
      e.stopImmediatePropagation()
    }
  }
  window.addEventListener("error", resizeObserverErrorHandler)
}

export function MainSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [suggestionModalOpen, setSuggestionModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load sidebar state from cookie on mount
  useEffect(() => {
    if (mounted) {
      const savedState = localStorage.getItem(SIDEBAR_STATE_COOKIE)
      if (savedState !== null) {
        setCollapsed(savedState === "collapsed")
      }
    }
  }, [mounted])

  // Save sidebar state to cookie when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(SIDEBAR_STATE_COOKIE, collapsed ? "collapsed" : "expanded")
    }
  }, [collapsed, mounted])

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Add keyboard shortcut for toggling sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "b" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [collapsed])

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem("enabl-authenticated")
    localStorage.removeItem("enabl-user-email")
    localStorage.removeItem("enabl-user-role")
    // Redirect to login page
    router.push("/login")
  }

  // Don't render sidebar on login or signup pages
  if (!mounted || pathname === "/login" || pathname === "/signup") {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen">
      {/* Feature Suggestion Modal */}
      <FeatureSuggestionModal open={suggestionModalOpen} onOpenChange={setSuggestionModalOpen} />

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 hidden flex-col border-r bg-white transition-all duration-300 md:flex",
          collapsed ? "w-16" : "w-64",
        )}
      >
        {/* Logo area - increased height for expanded state */}
        <div
          className={cn("flex items-center border-b", collapsed ? "h-20 justify-center" : "h-24 justify-start px-4")}
        >
          <Logo collapsed={collapsed} />
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-auto py-4">
          <nav className="flex flex-col gap-2 px-2">
            <NavItem
              href="/"
              icon={<Home className="h-5 w-5" />}
              label="Dashboard"
              isActive={pathname === "/"}
              collapsed={collapsed}
            />
            <NavItem
              href="/enablement-hub"
              icon={<BookOpen className="h-5 w-5" />}
              label="Enablement Hub"
              isActive={pathname === "/enablement-hub"}
              collapsed={collapsed}
            />
            <NavItem
              href="/call-analysis"
              icon={<Phone className="h-5 w-5" />}
              label="Call Analysis"
              isActive={pathname === "/call-analysis"}
              collapsed={collapsed}
            />
            <NavItem
              href="/live-training"
              icon={<Headphones className="h-5 w-5" />}
              label="Live Training"
              isActive={pathname === "/live-training"}
              collapsed={collapsed}
            />
          </nav>
        </div>

        {/* Footer items */}
        <div className="border-t py-4">
          <nav className="flex flex-col gap-2 px-2">
            <div
              className={cn(
                "group relative flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                collapsed ? "justify-center" : "justify-between",
              )}
            >
              {collapsed ? (
                <div className="relative">
                  <Bell className="h-5 w-5" />
                  <NotificationsPopover sidebarCollapsed={collapsed} />
                  <div className="absolute left-full ml-2 hidden z-50 rounded-md bg-popover px-2 py-1 text-sm text-popover-foreground shadow-md group-hover:block">
                    Notifications
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                  </div>
                  <NotificationsPopover sidebarCollapsed={collapsed} />
                </>
              )}
            </div>

            {/* Feature Suggestion Button */}
            <div
              onClick={() => setSuggestionModalOpen(true)}
              className={cn(
                "group relative flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer",
                collapsed ? "justify-center" : "justify-between",
              )}
            >
              <div className={cn("flex items-center gap-3", collapsed && "mx-auto")}>
                <Lightbulb className="h-5 w-5" />
                {!collapsed && <span>Suggest Feature</span>}
              </div>

              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-2 hidden z-50 rounded-md bg-popover px-2 py-1 text-sm text-popover-foreground shadow-md group-hover:block">
                  Suggest Feature
                </div>
              )}
            </div>

            <NavItem
              href="/settings"
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              isActive={pathname === "/settings"}
              collapsed={collapsed}
            />

            {/* Profile with Dropdown */}
            {collapsed ? (
              <div className="group relative flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Avatar" />
                        <AvatarFallback className="text-xs">JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="absolute left-full ml-2 hidden z-50 rounded-md bg-popover px-2 py-1 text-sm text-popover-foreground shadow-md group-hover:block">
                  Profile
                </div>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    className={cn(
                      "group relative flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer",
                      pathname === "/profile" ? "bg-primary text-primary-foreground" : "",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </div>
                    <Avatar className="ml-auto h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Avatar" />
                      <AvatarFallback className="text-xs">JD</AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      View Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
        </div>

        {/* Toggle button - adjusted position */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="absolute -right-3 top-28 h-6 w-6 rounded-full border bg-background shadow-md"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </Button>
      </div>

      {/* Mobile Sidebar (overlay) */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-300 md:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={toggleMobileSidebar}
      >
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 border-r bg-white transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Logo area - increased height for mobile too */}
          <div className="flex h-20 items-center justify-between border-b px-4">
            <Logo collapsed={false} />
            <Button variant="ghost" size="icon" onClick={toggleMobileSidebar} className="md:hidden">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>

          {/* Navigation items */}
          <div className="flex-1 overflow-auto py-4">
            <nav className="flex flex-col gap-2 px-2">
              <NavItem
                href="/"
                icon={<Home className="h-5 w-5" />}
                label="Dashboard"
                isActive={pathname === "/"}
                collapsed={false}
              />
              <NavItem
                href="/enablement-hub"
                icon={<BookOpen className="h-5 w-5" />}
                label="Enablement Hub"
                isActive={pathname === "/enablement-hub"}
                collapsed={false}
              />
              <NavItem
                href="/call-analysis"
                icon={<Phone className="h-5 w-5" />}
                label="Call Analysis"
                isActive={pathname === "/call-analysis"}
                collapsed={false}
              />
              <NavItem
                href="/live-training"
                icon={<Headphones className="h-5 w-5" />}
                label="Live Training"
                isActive={pathname === "/live-training"}
                collapsed={false}
              />
            </nav>
          </div>

          {/* Footer items */}
          <div className="border-t py-4">
            <nav className="flex flex-col gap-2 px-2">
              <div className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </div>
                <NotificationsPopover sidebarCollapsed={false} />
              </div>

              {/* Feature Suggestion Button (Mobile) */}
              <div
                onClick={() => setSuggestionModalOpen(true)}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
              >
                <Lightbulb className="h-5 w-5" />
                <span>Suggest Feature</span>
              </div>

              <NavItem
                href="/settings"
                icon={<Settings className="h-5 w-5" />}
                label="Settings"
                isActive={pathname === "/settings"}
                collapsed={false}
              />

              {/* Mobile Profile with Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    className={cn(
                      "group relative flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer",
                      pathname === "/profile" ? "bg-primary text-primary-foreground" : "",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </div>
                    <Avatar className="ml-auto h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Avatar" />
                      <AvatarFallback className="text-xs">JD</AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      View Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content - UPDATED to include RoleToggle */}
      <div className={cn("flex-1 transition-all duration-300", collapsed ? "md:ml-16" : "md:ml-64")}>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleMobileSidebar} className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open sidebar</span>
            </Button>
          </div>
          {/* Added back the RoleToggle component */}
          <RoleToggle />
        </header>
        <main className="p-3 md:p-5 w-full max-w-full overflow-x-hidden">{children}</main>
      </div>
    </div>
  )
}

function NavItem({
  href,
  icon,
  label,
  isActive,
  collapsed,
  extra,
}: {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  collapsed: boolean
  extra?: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(collapsed && "mx-auto")}>{icon}</div>
        {!collapsed && <span>{label}</span>}
      </div>
      {!collapsed && extra}

      {/* Tooltip for collapsed state */}
      {collapsed && (
        <div className="absolute left-full ml-2 hidden rounded-md bg-popover px-2 py-1 text-sm text-popover-foreground shadow-md group-hover:block">
          {label}
        </div>
      )}
    </Link>
  )
}
