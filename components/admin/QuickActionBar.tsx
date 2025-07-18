"use client"

import Link from "next/link"
import { Plus, ClipboardList, MessageCircle, Settings, Megaphone, BarChart3 } from "lucide-react"

export default function QuickActionBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t bg-background py-3 md:hidden">
      <Link href="/admin/openbill/quick" className="flex flex-col items-center text-base">
        <Plus className="h-6 w-6" />
        <span>เปิดบิล</span>
      </Link>
      <Link href="/admin/orders" className="flex flex-col items-center text-base">
        <ClipboardList className="h-6 w-6" />
        <span>ออเดอร์</span>
      </Link>
      <Link href="/admin/chat" className="flex flex-col items-center text-base">
        <MessageCircle className="h-6 w-6" />
        <span>แชท</span>
      </Link>
        <Link href="/admin/broadcast" className="flex flex-col items-center text-base">
          <Megaphone className="h-6 w-6" />
          <span>บรอดแคสต์</span>
        </Link>
        <Link href="/admin/analytics" className="flex flex-col items-center text-base">
          <BarChart3 className="h-6 w-6" />
          <span>สถิติ</span>
        </Link>
      <Link href="/admin/settings" className="flex flex-col items-center text-base">
        <Settings className="h-6 w-6" />
        <span>ตั้งค่า</span>
      </Link>
    </nav>
  )
}
