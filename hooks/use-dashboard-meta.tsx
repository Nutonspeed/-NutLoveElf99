"use client"
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { getDashboardMeta } from '@/lib/dashboardRoutes'

export function useDashboardMeta(pathname?: string) {
  const current = usePathname()
  const path = pathname || current
  return useMemo(() => getDashboardMeta(path), [path])
}
