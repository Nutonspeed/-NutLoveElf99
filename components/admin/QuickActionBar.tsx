"use client"

import Link from "next/link"
import { Plus, ClipboardList, MessageCircle, Settings } from "lucide-react"

export default function QuickActionBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t bg-background py-2 md:hidden">
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
    </nav>
  )
}
