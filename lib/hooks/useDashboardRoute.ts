'use client'
import { usePathname } from 'next/navigation'
import { dashboardRoutes, matchDashboardRoute, type DashboardRoute } from '../dashboard-routes'

export interface DashboardRouteInfo extends DashboardRoute {}

export function useDashboardRoute(): DashboardRouteInfo | undefined {
  const pathname = usePathname()
  return matchDashboardRoute(pathname)
}
