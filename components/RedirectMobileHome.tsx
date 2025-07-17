"use client"
import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/contexts/auth-context"

export default function RedirectMobileHome() {
  const isMobile = useIsMobile()
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (isMobile && pathname === "/" && isAuthenticated) {
      router.replace("/mobile-home")
    }
  }, [isMobile, isAuthenticated, pathname, router])

  return null
}
