"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Mail, Lock, User, Building, Phone, CreditCard, Calendar, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SignupPage() {
  const [step, setStep] = useState(1) // 1: Account Info, 2: Payment Info
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    city: "",
    postalCode: "",
    country: "United Kingdom",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [agreeToMarketing, setAgreeToMarketing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.email.includes("@")) newErrors.email = "Please enter a valid email"
    if (!formData.company.trim()) newErrors.company = "Company name is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    if (!agreeToTerms) newErrors.terms = "You must agree to the terms of service"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!paymentData.cardNumber.replace(/\s/g, "")) newErrors.cardNumber = "Card number is required"
    if (!paymentData.expiryDate) newErrors.expiryDate = "Expiry date is required"
    if (!paymentData.cvv) newErrors.cvv = "CVV is required"
    if (!paymentData.cardholderName.trim()) newErrors.cardholderName = "Cardholder name is required"
    if (!paymentData.billingAddress.trim()) newErrors.billingAddress = "Billing address is required"
    if (!paymentData.city.trim()) newErrors.city = "City is required"
    if (!paymentData.postalCode.trim()) newErrors.postalCode = "Postal code is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep2()) return

    setIsLoading(true)

    // Clear any existing localStorage data first
    localStorage.clear()

    // Simulate Stripe payment processing and account creation
    setTimeout(() => {
      // Store auth state and user info
      localStorage.setItem("enabl-authenticated", "true")
      localStorage.setItem("enabl-user-email", formData.email)
      localStorage.setItem("enabl-user-role", "manager")
      localStorage.setItem("enabl-user-name", `${formData.firstName} ${formData.lastName}`)
      localStorage.setItem("enabl-user-company", formData.company)
      localStorage.setItem("enabl-trial-start", new Date().toISOString())
      localStorage.setItem("enabl-payment-method", "stripe")
      localStorage.setItem("enabl-onboarding-required", "true")

      // Redirect to onboarding flow
      router.push("/onboarding")
      setIsLoading(false)
    }, 3000)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/login">
            <Image src="/images/enabl-logo.png" alt="Enabl Logo" width={480} height={160} className="h-24 w-auto" />
          </Link>
          <div className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Plan Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Start your free trial</h1>
              <p className="text-lg text-gray-600">
                Get full access to Enabl for 14 days. No commitment, cancel anytime.
              </p>
            </div>

            {/* Plan Card */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-xl">Sales Leaders Plan</CardTitle>
                <CardDescription>Perfect for sales leaders and their teams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">£44</span>
                  <span className="text-gray-600">/user/month</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm">14-day free trial included</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Full manager access automatically</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Add unlimited team members</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Cancel anytime, no questions asked</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Complete sales enablement platform</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-primary/20">
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Minimum Requirements:</strong> 2 users minimum (Manager + at least 1 team member).
                    Additional team members can be added during onboarding or anytime after.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Trial Details:</strong> Your 14-day free trial starts today. You won't be charged until the
                    trial ends. Cancel anytime during the trial period and you won't pay anything.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice with Stripe */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Shield className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900 mb-1">Secure Payment Processing</p>
                <p>
                  Your payment is processed securely by Stripe, trusted by millions of businesses worldwide. Your card
                  details are encrypted and never stored on our servers.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Powered by Stripe</span>
                  <span className="text-xs text-gray-500">256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Forms */}
          <div className="space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <div className={`flex-1 h-1 rounded ${step >= 2 ? "bg-primary" : "bg-gray-200"}`} />
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
            </div>

            {step === 1 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Create Your Account</CardTitle>
                  <CardDescription>Step 1 of 2: Account Information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleStep1Submit} className="space-y-4">
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className={`pl-10 ${errors.firstName ? "border-red-500" : ""}`}
                            required
                          />
                        </div>
                        {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Smith"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className={`pl-10 ${errors.lastName ? "border-red-500" : ""}`}
                            required
                          />
                        </div>
                        {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                          required
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="company"
                          type="text"
                          placeholder="Your Company Ltd"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className={`pl-10 ${errors.company ? "border-red-500" : ""}`}
                          required
                        />
                      </div>
                      {errors.company && <p className="text-xs text-red-500">{errors.company}</p>}
                    </div>

                    {/* Phone (Optional) */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-gray-400">(Optional)</span>
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+44 7700 900000"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
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
                      {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={agreeToTerms}
                          onCheckedChange={(checked) => {
                            setAgreeToTerms(checked as boolean)
                            if (errors.terms) setErrors((prev) => ({ ...prev, terms: "" }))
                          }}
                          className="mt-1"
                        />
                        <Label htmlFor="terms" className="text-sm leading-5">
                          I agree to the{" "}
                          <Link href="#" className="text-primary hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="#" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                      {errors.terms && <p className="text-xs text-red-500 ml-6">{errors.terms}</p>}

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="marketing"
                          checked={agreeToMarketing}
                          onCheckedChange={(checked) => setAgreeToMarketing(checked as boolean)}
                          className="mt-1"
                        />
                        <Label htmlFor="marketing" className="text-sm leading-5 text-gray-600">
                          I'd like to receive product updates and marketing communications
                        </Label>
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Secure Payment with Stripe</CardTitle>
                  <CardDescription>Step 2 of 2: Complete your 14-day free trial setup</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFinalSubmit} className="space-y-4">
                    {/* Stripe Badge */}
                    <div className="flex items-center justify-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Secured by Stripe</span>
                      <span className="text-xs text-blue-600">• PCI DSS Compliant</span>
                    </div>

                    {/* Card Number */}
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="cardNumber"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={paymentData.cardNumber}
                          onChange={(e) => handlePaymentChange("cardNumber", formatCardNumber(e.target.value))}
                          className={`pl-10 ${errors.cardNumber ? "border-red-500" : ""}`}
                          maxLength={19}
                          required
                        />
                      </div>
                      {errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber}</p>}
                    </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="expiryDate"
                            type="text"
                            placeholder="MM/YY"
                            value={paymentData.expiryDate}
                            onChange={(e) => handlePaymentChange("expiryDate", formatExpiryDate(e.target.value))}
                            className={`pl-10 ${errors.expiryDate ? "border-red-500" : ""}`}
                            maxLength={5}
                            required
                          />
                        </div>
                        {errors.expiryDate && <p className="text-xs text-red-500">{errors.expiryDate}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="text"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) => handlePaymentChange("cvv", e.target.value.replace(/\D/g, ""))}
                          className={errors.cvv ? "border-red-500" : ""}
                          maxLength={4}
                          required
                        />
                        {errors.cvv && <p className="text-xs text-red-500">{errors.cvv}</p>}
                      </div>
                    </div>

                    {/* Cardholder Name */}
                    <div className="space-y-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        type="text"
                        placeholder="John Smith"
                        value={paymentData.cardholderName}
                        onChange={(e) => handlePaymentChange("cardholderName", e.target.value)}
                        className={errors.cardholderName ? "border-red-500" : ""}
                        required
                      />
                      {errors.cardholderName && <p className="text-xs text-red-500">{errors.cardholderName}</p>}
                    </div>

                    {/* Billing Address */}
                    <div className="space-y-2">
                      <Label htmlFor="billingAddress">Billing Address</Label>
                      <Input
                        id="billingAddress"
                        type="text"
                        placeholder="123 Main Street"
                        value={paymentData.billingAddress}
                        onChange={(e) => handlePaymentChange("billingAddress", e.target.value)}
                        className={errors.billingAddress ? "border-red-500" : ""}
                        required
                      />
                      {errors.billingAddress && <p className="text-xs text-red-500">{errors.billingAddress}</p>}
                    </div>

                    {/* City and Postal Code */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          type="text"
                          placeholder="London"
                          value={paymentData.city}
                          onChange={(e) => handlePaymentChange("city", e.target.value)}
                          className={errors.city ? "border-red-500" : ""}
                          required
                        />
                        {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          type="text"
                          placeholder="SW1A 1AA"
                          value={paymentData.postalCode}
                          onChange={(e) => handlePaymentChange("postalCode", e.target.value)}
                          className={errors.postalCode ? "border-red-500" : ""}
                          required
                        />
                        {errors.postalCode && <p className="text-xs text-red-500">{errors.postalCode}</p>}
                      </div>
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={paymentData.country}
                        onValueChange={(value) => handlePaymentChange("country", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Ireland">Ireland</SelectItem>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Trial Notice */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Free Trial:</strong> You won't be charged today. Your 14-day free trial starts
                        immediately. Billing begins on{" "}
                        {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}{" "}
                        unless you cancel before then.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button type="submit" className="flex-1" disabled={isLoading}>
                        {isLoading ? "Processing with Stripe..." : "Start Free Trial"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
