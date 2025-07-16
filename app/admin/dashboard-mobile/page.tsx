"use client"
import BottomNav from "@/components/BottomNav"

export default function AdminDashboardMobilePage() {
  return (
    <div className="min-h-screen p-4 pb-20 space-y-4">
      <h1 className="text-2xl font-bold">แดชบอร์ด</h1>
      <p>สรุปภาพรวมร้านค้า (mobile)</p>
      <BottomNav />
    </div>
  )
}
