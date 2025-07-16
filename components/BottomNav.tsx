"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Menu as MenuIcon, MessageCircle, FilePlus } from "lucide-react"

const chatwootUrl = process.env.NEXT_PUBLIC_CHATWOOT_URL || "http://localhost:3000"

export default function BottomNav() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  const openChat = (e: React.MouseEvent) => {
    e.preventDefault()
    window.open(chatwootUrl, "_blank")
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t bg-background py-2 md:hidden">
      <Link href="/admin/dashboard-mobile" className={`flex flex-col items-center text-xs ${isActive("/admin/dashboard-mobile") ? "text-primary" : ""}`}> 
        <Home className="h-5 w-5" />
        <span>หน้าหลัก</span>
      </Link>
      <Link href="/admin/menu" className={`flex flex-col items-center text-xs ${isActive("/admin/menu") ? "text-primary" : ""}`}> 
        <MenuIcon className="h-5 w-5" />
        <span>เมนู</span>
      </Link>
      <a href="#chat" onClick={openChat} className="flex flex-col items-center text-xs">
        <MessageCircle className="h-5 w-5" />
        <span>แชท</span>
      </a>
      <Link href="/admin/bill" className={`flex flex-col items-center text-xs ${isActive("/admin/bill") ? "text-primary" : ""}`}> 
        <FilePlus className="h-5 w-5" />
        <span>สร้างบิล</span>
      </Link>
    </nav>
  )
}
