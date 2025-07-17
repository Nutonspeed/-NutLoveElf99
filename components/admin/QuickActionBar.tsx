"use client"

import Link from "next/link"
import { Plus, ClipboardList, MessageCircle, Settings, Megaphone, BarChart3 } from "lucide-react"

export default function QuickActionBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t bg-background py-2 md:hidden lg:hidden">
      <Link href="/admin/openbill/quick" className="flex flex-col items-center text-xs">
        <Plus className="h-5 w-5" />
        <span>เปิดบิล</span>
      </Link>
      <Link href="/admin/orders" className="flex flex-col items-center text-xs">
        <ClipboardList className="h-5 w-5" />
        <span>ออเดอร์</span>
      </Link>
      <Link href="/admin/chat" className="flex flex-col items-center text-xs">
        <MessageCircle className="h-5 w-5" />
        <span>แชท</span>
      </Link>
        <Link href="/admin/broadcast" className="flex flex-col items-center text-xs">
          <Megaphone className="h-5 w-5" />
          <span>บรอดแคสต์</span>
        </Link>
        <Link href="/admin/analytics" className="flex flex-col items-center text-xs">
          <BarChart3 className="h-5 w-5" />
          <span>สถิติ</span>
        </Link>
      <Link href="/admin/settings" className="flex flex-col items-center text-xs">
        <Settings className="h-5 w-5" />
        <span>ตั้งค่า</span>
      </Link>
    </nav>
  )
}
