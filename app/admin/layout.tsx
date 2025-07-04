"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    if (user?.role !== "admin") {
      router.push("/")
      return
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">กรุณาเข้าสู่ระบบ</h1>
          <p className="text-gray-600 mb-4">คุณต้องเข้าสู่ระบบเพื่อเข้าถึงหน้านี้</p>
          <Link href="/login">
            <Button>เข้าสู่ระบบ</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่มีสิทธิ์เข้าถึง</h1>
          <p className="text-gray-600 mb-4">คุณไม่มีสิทธิ์เข้าถึงระบบจัดการ</p>
          <Link href="/">
            <Button>กลับหน้าแรก</Button>
          </Link>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
