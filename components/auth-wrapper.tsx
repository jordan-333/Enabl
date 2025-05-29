"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [needsOnboarding, setNeedsOnboarding] = useState<boolean | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = localStorage.getItem("enabl-authenticated") === "true"
      const onboardingRequired = localStorage.getItem("enabl-onboarding-required") === "true"
      const onboardingCompleted = localStorage.getItem("enabl-onboarding-completed") === "true"

      console.log("Auth check:", {
        authenticated,
        onboardingRequired,
        onboardingCompleted,
        pathname,
      })

      setIsAuthenticated(authenticated)
      setNeedsOnboarding(authenticated && onboardingRequired && !onboardingCompleted)
    }

    checkAuth()

    // Listen for storage changes (in case of login from another tab)
    window.addEventListener("storage", checkAuth)
    return () => window.removeEventListener("storage", checkAuth)
  }, [])

  useEffect(() => {
    if (isAuthenticated === null || needsOnboarding === null) return

    const publicPaths = ["/login", "/signup"]
    const isPublicPath = publicPaths.includes(pathname)
    const isOnboardingPath = pathname === "/onboarding"

    console.log("Navigation check:", {
      isAuthenticated,
      needsOnboarding,
      pathname,
      isPublicPath,
      isOnboardingPath,
    })

    if (!isAuthenticated && !isPublicPath) {
      console.log("Redirecting to login...")
      router.push("/login")
    } else if (isAuthenticated && isPublicPath) {
      if (needsOnboarding) {
        console.log("Redirecting to onboarding...")
        router.push("/onboarding")
      } else {
        console.log("Redirecting to dashboard...")
        router.push("/")
      }
    } else if (isAuthenticated && needsOnboarding && !isOnboardingPath) {
      console.log("Redirecting to onboarding (needs onboarding)...")
      router.push("/onboarding")
    } else if (isAuthenticated && !needsOnboarding && isOnboardingPath) {
      console.log("Redirecting to dashboard (onboarding completed)...")
      router.push("/")
    }
  }, [isAuthenticated, needsOnboarding, pathname, router])

  // Show loading state while checking authentication
  if (isAuthenticated === null || needsOnboarding === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Show login/signup pages without sidebar
  const publicPaths = ["/login", "/signup", "/onboarding"]
  if (publicPaths.includes(pathname)) {
    return <>{children}</>
  }

  // Show main app with sidebar for authenticated users
  return <>{children}</>
}
