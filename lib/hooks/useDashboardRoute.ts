'use client'
import { usePathname } from 'next/navigation'

const routeMap: Record<string, { title: string; category: string }> = {
  '/dashboard': { title: 'Overview', category: 'Overview' },
  '/dashboard/orders': { title: 'Orders', category: 'Orders' },
  '/dashboard/customers': { title: 'Customers', category: 'Customers' },
  '/dashboard/reviews': { title: 'Reviews', category: 'Reviews' },
  '/dashboard/settings': { title: 'Settings', category: 'Settings' },
}

export function useDashboardRoute() {
  const pathname = usePathname()
  const info = routeMap[pathname] ?? { title: 'Dashboard', category: 'Other' }
  const breadcrumb = [
    { title: 'Dashboard', href: '/dashboard' },
    pathname !== '/dashboard' ? { title: info.title, href: pathname } : null,
  ].filter(Boolean)
  return { ...info, breadcrumb }
}
