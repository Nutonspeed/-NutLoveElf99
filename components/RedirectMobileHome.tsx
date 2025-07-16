"use client"
import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"

export default function RedirectMobileHome() {
  const isMobile = useIsMobile()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (isMobile && pathname === "/") {
      router.replace("/mobile-home")
    }
  }, [isMobile, pathname, router])

  return null
}
