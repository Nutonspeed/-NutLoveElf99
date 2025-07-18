"use client"
import { useState } from "react"
import Sidebar from "@/components/admin/Sidebar"
import Topbar from "@/components/admin/Topbar"
import { Sheet, SheetContent } from "@/components/ui/modals/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import WithSuspense from "@/components/WithSuspense"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useIsMobile()

  return (
    <WithSuspense>
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
        </div>
      </div>
    </WithSuspense>
  )
}
