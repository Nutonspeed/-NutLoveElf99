"use client"

import type React from "react"
import { useAdminGuard } from "@/contexts/use-admin-guard"
import Sidebar from "@/components/admin/Sidebar"
import Topbar from "@/components/admin/Topbar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { loading, isAdmin } = useAdminGuard()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  )
}
