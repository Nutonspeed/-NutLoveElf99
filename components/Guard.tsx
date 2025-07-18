"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import type { Role } from "@/lib/mock-roles"

export default function Guard({
  role,
  children,
  fallback = null,
}: {
  role: Role | Role[]
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const roles = Array.isArray(role) ? role : [role]

  useEffect(() => {
    if (isLoading) return
    if (!isAuthenticated && !roles.includes("guest")) {
      router.replace("/auth/login")
    } else if (isAuthenticated && !roles.includes(user?.role as Role)) {
      router.replace("/")
    }
  }, [isAuthenticated, isLoading, user, roles, router])

  if (isLoading) return <>{fallback || <p>Loading...</p>}</>
  if (!isAuthenticated && !roles.includes("guest")) return <>{fallback}</>
  if (isAuthenticated && !roles.includes(user?.role as Role)) return <>{fallback}</>
  return <>{children}</>
}
