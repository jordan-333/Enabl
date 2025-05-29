"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [isResetting, setIsResetting] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    console.log("Login attempt:", { email, password })

    // Clear any existing localStorage data first
    localStorage.clear()

    // Simulate login process
    setTimeout(() => {
      try {
        // Store auth state in localStorage
        localStorage.setItem("enabl-authenticated", "true")
        localStorage.setItem("enabl-user-email", email)

        // For demo credentials, skip onboarding and set up demo user
        if (email === "demo@enabl.com") {
          console.log("Setting up demo user...")
          localStorage.setItem("enabl-onboarding-completed", "true")
          localStorage.setItem("enabl-user-role", "closer")
          localStorage.setItem("enabl-user-name", "Alex Johnson")
          // Remove any onboarding requirement
          localStorage.removeItem("enabl-onboarding-required")
          console.log("Demo user setup complete:", {
            name: localStorage.getItem("enabl-user-name"),
            role: localStorage.getItem("enabl-user-role"),
            onboarding: localStorage.getItem("enabl-onboarding-completed")
          })
        }

        // For new account credentials, set up Jordan's account
        if (email === "jordan@salesgrowthclub.com") {
          console.log("Setting up new account user...")
          localStorage.setItem("enabl-onboarding-completed", "true")
          localStorage.setItem("enabl-user-role", "manager")
          localStorage.setItem("enabl-user-name", "Jordan Chrisostomou")
          // Remove any onboarding requirement
          localStorage.removeItem("enabl-onboarding-required")
          console.log("New account setup complete:", {
            name: localStorage.getItem("enabl-user-name"),
            role: localStorage.getItem("enabl-user-role"),
            onboarding: localStorage.getItem("enabl-onboarding-completed")
          })
        }

        console.log("Login successful, redirecting...")
        console.log("Final localStorage state:", {
          authenticated: localStorage.getItem("enabl-authenticated"),
          email: localStorage.getItem("enabl-user-email"),
          name: localStorage.getItem("enabl-user-name"),
          role: localStorage.getItem("enabl-user-role"),
          onboarding: localStorage.getItem("enabl-onboarding-completed")
        })

        // Add a small delay to ensure localStorage is set before redirect
        setTimeout(() => {
          // Force a page reload to ensure localStorage changes are picked up
          window.location.href = "/"
        }, 100)
      } catch (error) {
        console.error("Login error:", error)
        setIsLoading(false)
      }
    }, 1500)
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsResetting(true)

    // Simulate password reset process
    setTimeout(() => {
      setResetSent(true)
      setIsResetting(false)

      // Auto close modal after 3 seconds
      setTimeout(() => {
        setShowForgotPassword(false)
        setResetSent(false)
        setResetEmail("")
      }, 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center mb-3">
            <Image src="/images/enabl-logo.png" alt="Enabl Logo" width={480} height={160} className="h-40 w-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-600 mt-1">Sign in to your Enabl account</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </Label>
                </div>
                <Button
                  variant="link"
                  className="px-0 text-sm"
                  onClick={() => setShowForgotPassword(true)}
                  type="button"
                >
                  Forgot password?
                </Button>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-2 border-amber-200 bg-amber-50">
          <CardContent className="pt-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-amber-800 mb-3">Test Accounts</h3>
              <div className="text-xs text-amber-700 space-y-3">
                <div className="border-b border-amber-300 pb-2">
                  <p className="font-semibold">Demo Account (Full Data)</p>
                  <p>
                    <strong>Email:</strong> demo@enabl.com
                  </p>
                  <p>
                    <strong>Password:</strong> demo123
                  </p>
                  <p className="italic">Explore with sample data</p>
                </div>
                <div>
                  <p className="font-semibold">New Account (No Data)</p>
                  <p>
                    <strong>Email:</strong> jordan@salesgrowthclub.com
                  </p>
                  <p>
                    <strong>Password:</strong> SGC123
                  </p>
                  <p className="italic">See the new user experience</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Forgot Password Modal */}
        {showForgotPassword && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-xl text-center">Reset Password</CardTitle>
                <CardDescription className="text-center">
                  Enter your email address and we'll send you a link to reset your password
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!resetSent ? (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="reset-email"
                          type="email"
                          placeholder="Enter your email"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setShowForgotPassword(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1" disabled={isResetting}>
                        {isResetting ? "Sending..." : "Send Reset Link"}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Reset link sent!</h3>
                      <p className="text-sm text-gray-600 mt-1">We've sent a password reset link to {resetEmail}</p>
                      <p className="text-xs text-gray-500 mt-2">This modal will close automatically in a few seconds</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
