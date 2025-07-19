'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { ShoppingCart, Users, Megaphone, BarChart3, Settings as SettingsIcon } from 'lucide-react'
import { dashboardRoutes, DashboardCategory } from '@/lib/dashboard-routes'

const categoryIcons: Record<DashboardCategory, any> = {
  Orders: ShoppingCart,
  Customers: Users,
  Marketing: Megaphone,
  Analytics: BarChart3,
  Settings: SettingsIcon,
}

export default function DashboardSidebar() {
  const pathname = usePathname()
  const grouped = dashboardRoutes.reduce<Record<DashboardCategory, typeof dashboardRoutes>>( (acc, r) => {
    acc[r.category] = acc[r.category] ? [...acc[r.category], r] : [r]
    return acc
  }, {} as any)

  return (
    <aside className="w-60 border-r bg-sidebar text-sidebar-foreground">
      <nav className="p-4 space-y-4">
        {Object.entries(grouped).map(([category, items]) => {
          const Icon = categoryIcons[category as DashboardCategory]
          return (
            <div key={category} className="space-y-1">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <Icon className="h-4 w-4" /> {category}
              </h2>
              <div className="pl-4 space-y-1">
                {items.map(item => {
                  const active = pathname === item.path || pathname.startsWith(item.path + '/')
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={clsx('block rounded px-2 py-1 text-sm hover:bg-muted', active && 'bg-muted')}
                    >
                      {item.title}
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
