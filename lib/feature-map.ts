import { sidebarSections } from '@/components/ui/sidebar.config'
import { adminSidebarGroups } from '@/components/admin/sidebar.config'

export interface FeatureMapEntry {
  path: string
  label: string
  feature: string
  source: 'store' | 'admin'
}

export function getFeatureMap(): FeatureMapEntry[] {
  const storeRoutes = sidebarSections.flatMap(section =>
    section.items.map(item => ({
      path: item.href,
      label: item.label,
      feature: section.section,
      source: 'store' as const,
    })),
  )

  const adminRoutes = adminSidebarGroups.flatMap(group =>
    group.items.map(item => ({
      path: item.href,
      label: item.label,
      feature: item.feature,
      source: 'admin' as const,
    })),
  )

  return [...storeRoutes, ...adminRoutes]
}
