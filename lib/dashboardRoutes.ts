export interface DashboardRoute {
  title: string
  category: string
}

export const dashboardRoutes: Record<string, DashboardRoute> = {
  '/dashboard': { title: 'Dashboard', category: 'general' },
  '/dashboard/orders': { title: 'Orders', category: 'orders' },
  '/dashboard/fabrics': { title: 'Fabrics', category: 'inventory' },
  '/dashboard/collections': { title: 'Collections', category: 'inventory' },
  '/dashboard/bill': { title: 'Bills', category: 'orders' },
  '/dashboard/bills': { title: 'Bills', category: 'orders' },
  '/dashboard/customers': { title: 'Customers', category: 'customers' },
  '/dashboard/stock': { title: 'Stock', category: 'inventory' },
  '/dashboard/tools': { title: 'Tools', category: 'tools' },
  '/dashboard/analytics': { title: 'Analytics', category: 'analytics' },
  '/dashboard/automation': { title: 'Automation', category: 'automation' },
  '/dashboard/devtools': { title: 'Dev Tools', category: 'dev' },
  '/dashboard/shipping': { title: 'Shipping', category: 'orders' },
  '/dashboard/settings': { title: 'Settings', category: 'settings' },
  '/dashboard/logs': { title: 'Logs', category: 'system' },
  '/dashboard/profile': { title: 'Profile', category: 'profile' },
  '/dashboard/broadcast': { title: 'Broadcast', category: 'marketing' },
  '/dashboard/campaigns': { title: 'Campaigns', category: 'marketing' },
  '/dashboard/storefront': { title: 'Storefront', category: 'storefront' },
  '/dashboard/insight': { title: 'Insight', category: 'analytics' },
  '/dashboard/alerts': { title: 'Alerts', category: 'system' },
  '/dashboard/members': { title: 'Members', category: 'customers' },
}

export function getDashboardMeta(pathname: string): DashboardRoute | undefined {
  const match = Object.entries(dashboardRoutes)
    .filter(([path]) => pathname === path || pathname.startsWith(path + '/'))
    .sort((a, b) => b[0].length - a[0].length)[0]
  return match?.[1]
}
