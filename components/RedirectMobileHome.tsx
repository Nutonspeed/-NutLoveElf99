"use client"
import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/contexts/auth-context"

function Redirect() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()

  useEffect(() => {
    if (isMobile && pathname === "/" && isAuthenticated) {
      router.replace("/mobile-home")
    }
  }, [isMobile, isAuthenticated, pathname, router])

  return null
}

export default function RedirectMobileHome() {
  const pathname = usePathname()
  if (pathname !== "/") {
    return null
  }
  return <Redirect />
}
