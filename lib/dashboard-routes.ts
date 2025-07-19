export type DashboardCategory = 'Orders' | 'Customers' | 'Marketing' | 'Analytics' | 'Settings'

export interface DashboardRoute {
  path: string
  title: string
  category: DashboardCategory
  breadcrumb: string[]
}

export const dashboardRoutes: DashboardRoute[] = [
  { path: '/dashboard/orders', title: 'Orders', category: 'Orders', breadcrumb: ['Orders'] },
  { path: '/dashboard/customers', title: 'Customers', category: 'Customers', breadcrumb: ['Customers'] },
  { path: '/dashboard/marketing', title: 'Marketing', category: 'Marketing', breadcrumb: ['Marketing'] },
  { path: '/dashboard/analytics', title: 'Analytics', category: 'Analytics', breadcrumb: ['Analytics'] },
  { path: '/dashboard/settings', title: 'Settings', category: 'Settings', breadcrumb: ['Settings'] },
]

export function matchDashboardRoute(pathname: string): DashboardRoute | undefined {
  return dashboardRoutes.find(r => pathname === r.path || pathname.startsWith(r.path + '/'))
}
