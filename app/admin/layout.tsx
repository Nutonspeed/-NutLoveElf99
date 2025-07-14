"use client"

import type React from "react"
import { useAdminGuard } from "@/contexts/use-admin-guard"
import Sidebar from "@/components/admin/Sidebar"
import Topbar from "@/components/admin/Topbar"
import { Sheet, SheetContent } from "@/components/ui/modals/sheet"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { AdminProductsProvider } from "@/contexts/admin-products-context"
import { AdminCollectionsProvider } from "@/contexts/admin-collections-context"
import { AdminToast } from "@/components/admin/AdminToast"
import QuickActionBar from "@/components/admin/QuickActionBar"
import ErrorBoundary from "@/components/ErrorBoundary"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { loading, isAdmin, conflict } = useAdminGuard()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useIsMobile()

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

  if (conflict) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>session conflict detected</p>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <ErrorBoundary>
      <AdminCollectionsProvider>
        <AdminProductsProvider>
          <div className="flex min-h-screen">
            <Sidebar className="hidden md:flex" />
            {isMobile && (
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetContent side="left" className="p-0 w-60">
                  <Sidebar />
                </SheetContent>
              </Sheet>
            )}
            <div className="flex flex-1 flex-col">
              <Topbar onMenuClick={() => setSidebarOpen(true)} />
              <main className="flex-1 p-4 pb-20 md:pb-4">{children}</main>
              <AdminToast />
              <QuickActionBar />
            </div>
          </div>
        </AdminProductsProvider>
      </AdminCollectionsProvider>
    </ErrorBoundary>
  )
}
