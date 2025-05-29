import type React from "react"
import "../styles/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MainSidebar } from "@/components/main-sidebar"
import { UserProvider } from "@/components/user-context"
import { AuthWrapper } from "@/components/auth-wrapper"
import { SampleDataProvider } from "@/components/sample-data-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Enabl SaaS",
  description: "Sales Enablement Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <SampleDataProvider>
              <AuthWrapper>
                <MainSidebar>{children}</MainSidebar>
              </AuthWrapper>
            </SampleDataProvider>
          </UserProvider>
        </ThemeProvider>
        <div className="bg-red-500 text-white p-4">If you see a red box, Tailwind is working!</div>
      </body>
    </html>
  )
}
