"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Logo({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <Link href="/" className={cn("flex items-center", collapsed ? "justify-center w-full" : "")}>
      {collapsed ? (
        // Use the new icon for collapsed state with smaller size
        <div className="flex h-9 w-9 items-center justify-center overflow-hidden">
          <Image
            src="/images/enabl-icon-transparent.png"
            alt="Enabl Icon"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            priority
          />
        </div>
      ) : (
        // Keep the expanded logo exactly the same
        <Image
          src="/images/enabl-logo-transparent.png"
          alt="Enabl Logo"
          width={150}
          height={60}
          className="h-10 w-auto"
          priority
          style={{ objectFit: "contain" }}
        />
      )}
    </Link>
  )
}
