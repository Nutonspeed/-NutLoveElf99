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
  BarChart3,
  Megaphone,
  ShieldCheck,
  Folder,
  Image,
  Star,
  Boxes,
  Wallet,
  HelpCircle,
  MailQuestion,
  Target,
  Flag,
  Bolt,
  UserCog,
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

const menuItems = [
  { href: "/admin/dashboard", label: "แดชบอร์ด", icon: Home, feature: "dashboard" },
  { href: "/admin/orders", label: "คำสั่งซื้อ", icon: ShoppingCart, feature: "inventory" },
  { href: "/admin/products", label: "สินค้า", icon: Package, feature: "inventory" },
  { href: "/admin/inventory", label: "สต็อก", icon: Layers, feature: "inventory" },
  { href: "/admin/customers", label: "ลูกค้า", icon: Users, feature: "inventory" },
  { href: "/admin/coupons", label: "คูปอง", icon: Percent, feature: "inventory" },
  { href: "/admin/quotes", label: "ใบเสนอราคา", icon: FileText, feature: "inventory" },
  { href: "/admin/notifications", label: "แจ้งเตือน", icon: Bell, feature: "inventory" },
  { href: "/admin/chat", label: "แชท", icon: MessageCircle, feature: "chat" },
  { href: "/admin/analytics", label: "สถิติ", icon: BarChart3, feature: "analytics" },
  { href: "/admin/broadcast", label: "บรอดแคสต์", icon: Megaphone, feature: "broadcast" },
  { href: "/admin/claims", label: "เคลม", icon: ShieldCheck, feature: "claims" },
  { href: "/admin/collections", label: "คอลเลกชัน", icon: Folder, feature: "collections" },
  { href: "/admin/media", label: "มีเดีย", icon: Image, feature: "media" },
  { href: "/admin/reviews", label: "รีวิว", icon: Star, feature: "reviews" },
  { href: "/admin/supply-tracker", label: "สต็อกภายใน", icon: Boxes, feature: "supply" },
  { href: "/admin/unpaid", label: "ค้างจ่าย", icon: Wallet, feature: "unpaid" },
  { href: "/admin/faq", label: "คำถามพบบ่อย", icon: HelpCircle, feature: "faq" },
  { href: "/admin/feedback", label: "ความคิดเห็น", icon: MailQuestion, feature: "feedback" },
  { href: "/admin/campaign-insight", label: "ข้อมูลแคมเปญ", icon: Target, feature: "campaigns" },
  { href: "/admin/campaigns/summary", label: "สรุปแคมเปญ", icon: Flag, feature: "campaigns" },
  { href: "/admin/bills/fast", label: "เปิดบิลด่วน", icon: Bolt, feature: "fastBills" },
  { href: "/admin/users", label: "ผู้ใช้", icon: UserCog, feature: "users" },
]

const toolItems = [
  { href: "/admin/chat-insight", label: "บิลแชท", icon: FileText, feature: "logs" },
  { href: "/admin/chat-activity", label: "กิจกรรมแชท", icon: List, feature: "logs" },
  { href: "/admin/logs", label: "บันทึก", icon: FileText, feature: "logs" },
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
        แอดมิน
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        <p className="px-3 mb-1 text-xs font-semibold text-gray-500">เมนูแอดมิน</p>
        {menuItems.filter(item => canAccess(user?.role, item.feature)).map(({ href, label, icon: Icon }) => {
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
        {user?.role === 'superadmin' && (
          <>
            <p className="px-3 mt-4 mb-1 text-xs font-semibold text-gray-500">เครื่องมือผู้ดูแล</p>
            {toolItems.filter(item => canAccess(user?.role, item.feature)).map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`)
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
                </Link>
              )
            })}
          </>
        )}
      </nav>
    </aside>
  )
}
