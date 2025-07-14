"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-context"

export function useAdminGuard() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [conflict, setConflict] = useState(false)

  useEffect(() => {
    const cookies =
      typeof document !== 'undefined' ? document.cookie : ''
    if (cookies.includes('elf_admin_session') && cookies.includes('chatwoot_session')) {
      setConflict(true)
      return
    }
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
  return { isAdmin: isAuthenticated && user?.role === "admin", loading, conflict }
}
