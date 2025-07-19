'use client'
import type React from 'react'
import { useDashboardRoute } from '@/lib/hooks/useDashboardRoute'
import { DashboardSidebar } from './sidebar'
import { useSidebarState } from '@/hooks/useSidebarState'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const route = useDashboardRoute()
  const { open, toggleSidebar } = useSidebarState(false)

  return (
    <div className="flex min-h-screen">
      {open && <DashboardSidebar />}
      <div className="flex-1 flex flex-col">
        <header className="border-b p-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">{route?.title ?? 'Dashboard'}</h1>
          <button className="md:hidden" onClick={toggleSidebar}>☰</button>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  )
}
