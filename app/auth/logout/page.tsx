"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function LogoutPage() {
  const { logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    logout()
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth")
    }
    if (typeof document !== "undefined") {
      document.cookie =
        "elf_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
    router.replace("/auth/login")
  }, [logout, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      กำลังออกจากระบบ...
    </div>
  )
}
