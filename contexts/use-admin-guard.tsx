"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-context"

export function useAdminGuard() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login")
      return
    }
    if (user?.role !== "admin") {
      router.replace("/")
      return
    }
    setLoading(false)
  }, [isAuthenticated, user, router])

  return { isAdmin: isAuthenticated && user?.role === "admin", loading }
}
