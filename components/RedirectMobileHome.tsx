"use client"
import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"

function Redirect() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const pathname = usePathname()

  useEffect(() => {
    if (isMobile && pathname === "/") {
      router.replace("/mobile-home")
    }
  }, [isMobile, pathname, router])

  return null
}

export default function RedirectMobileHome() {
  const pathname = usePathname()
  if (pathname !== "/") {
    return null
  }
  return <Redirect />
}
