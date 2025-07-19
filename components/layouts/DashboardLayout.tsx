"use client"
import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Users, BarChart3, MessageCircle, Settings as SettingsIcon } from "lucide-react"
import Guard from "@/components/Guard"
import { useIsMobile } from "@/hooks/use-mobile"

interface DashboardNavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: DashboardNavItem[] = [
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { label: "Reviews", href: "/dashboard/reviews", icon: MessageCircle },
  { label: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  const DesktopNav = (
    <nav className="hidden gap-4 border-b bg-background px-4 py-2 text-sm font-medium md:flex">
      {navItems.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md hover:text-primary ${isActive(href) ? "text-primary bg-muted" : ""}`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </nav>
  )

  const MobileNav = (
    <nav className="fixed bottom-0 inset-x-0 z-40 flex justify-around border-t bg-background py-2 text-xs md:hidden">
      {navItems.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-col items-center flex-1 ${isActive(href) ? "text-primary" : ""}`}
        >
          <Icon className="h-5 w-5" />
          {label}
        </Link>
      ))}
    </nav>
  )

  return (
    <Guard role={["admin", "staff"]}>
      <div className="min-h-screen pb-16 md:pb-0">
        {!isMobile && DesktopNav}
        <div className="p-4">{children}</div>
        {isMobile && MobileNav}
      </div>
    </Guard>
  )
}

export { navItems as dashboardNavItems }
