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
import { adminRoutes } from "@/components/admin/admin-nav"
import clsx from "clsx"
import { mockNotifications } from "@/lib/mock-notifications"
import {
  loadNotificationStatus,
  unreadCount,
} from "@/lib/mock-read-status"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { canAccess } from "@/lib/mock-roles"


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
        {adminRoutes.filter(item => canAccess(user?.role, item.feature)).map(({ href, label, icon: Icon }) => {
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
