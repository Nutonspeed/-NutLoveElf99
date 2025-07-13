"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  ShoppingCart,
  Package,
  Layers,
  Users,
  Percent,
  Bell,
  MessageCircle,
  FileText,
  List,
} from "lucide-react"
import clsx from "clsx"
import { mockNotifications } from "@/lib/mock-notifications"
import {
  loadNotificationStatus,
  unreadCount,
} from "@/lib/mock-read-status"
import { useEffect, useState } from "react"

const navItems = [
  { href: "/admin/dashboard", label: "แดชบอร์ด", icon: Home },
  { href: "/admin/orders", label: "คำสั่งซื้อ", icon: ShoppingCart },
  { href: "/admin/products", label: "สินค้า", icon: Package },
  { href: "/admin/inventory", label: "สต็อก", icon: Layers },
  { href: "/admin/customers", label: "ลูกค้า", icon: Users },
  { href: "/admin/coupons", label: "คูปอง", icon: Percent },
  { href: "/admin/quotes", label: "ใบเสนอราคา", icon: FileText },
  { href: "/admin/notifications", label: "แจ้งเตือน", icon: Bell },
  { href: "/admin/chat", label: "แชท", icon: MessageCircle },
  { href: "/admin/chat-insight", label: "บิลแชท", icon: FileText },
  { href: "/admin/chat-activity", label: "กิจกรรมแชท", icon: List },
]

export default function Sidebar({ className = "" }: { className?: string }) {
  const pathname = usePathname()
  const [count, setCount] = useState(0)

  useEffect(() => {
    loadNotificationStatus()
    setCount(unreadCount(mockNotifications.map((n) => n.id)))
  }, [pathname])

  return (
    <aside className={clsx("w-60 flex-col border-r bg-sidebar text-sidebar-foreground", className)}>
      <div className="h-16 flex items-center px-4 text-lg font-bold bg-sidebar-primary text-sidebar-primary-foreground">
        Admin
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`)
          const badge = href === "/admin/notifications" ? count : 0
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                active && "bg-sidebar-primary text-sidebar-primary-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1">{label}</span>
              {badge > 0 && (
                <span className="ml-auto rounded-full bg-red-600 px-2 text-xs text-white">
                  {badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
