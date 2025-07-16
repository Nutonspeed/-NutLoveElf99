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
import { useAuth } from "@/contexts/auth-context"
import { canAccess } from "@/lib/mock-roles"

const navItems = [
  { href: "/admin/dashboard", label: "แดชบอร์ด", icon: Home, feature: "dashboard" },
  { href: "/admin/orders", label: "คำสั่งซื้อ", icon: ShoppingCart, feature: "inventory" },
  { href: "/admin/products", label: "สินค้า", icon: Package, feature: "inventory" },
  { href: "/admin/inventory", label: "สต็อก", icon: Layers, feature: "inventory" },
  { href: "/admin/customers", label: "ลูกค้า", icon: Users, feature: "inventory" },
  { href: "/admin/coupons", label: "คูปอง", icon: Percent, feature: "inventory" },
  { href: "/admin/quotes", label: "ใบเสนอราคา", icon: FileText, feature: "inventory" },
  { href: "/admin/notifications", label: "แจ้งเตือน", icon: Bell, feature: "inventory" },
  { href: "/admin/chat", label: "แชท", icon: MessageCircle, feature: "chat" },
  { href: "/admin/chat-insight", label: "บิลแชท", icon: FileText, feature: "logs" },
  { href: "/admin/chat-activity", label: "กิจกรรมแชท", icon: List, feature: "logs" },
  { href: "/admin/logs", label: "Log", icon: FileText, feature: "logs" },
  { href: "/admin/settings", label: "ตั้งค่า", icon: Settings, feature: "dashboard" },
]

export default function Sidebar({ className = "" }: { className?: string }) {
  const pathname = usePathname()
  const [count, setCount] = useState(0)
  const { user } = useAuth()

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
        {navItems.filter(item => canAccess(user?.role, item.feature)).map(({ href, label, icon: Icon }) => {
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
