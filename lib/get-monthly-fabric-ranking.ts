import { mockFabrics } from './mock-fabrics'
import { mockFabricViews } from './mock-fabric-views'

export interface FabricViewStat {
  slug: string
  name: string
  views: number
}

export function getMonthlyFabricRanking(): FabricViewStat[] {
  return mockFabrics
    .map((f) => ({
      slug: f.slug,
      name: f.name,
      views: mockFabricViews[f.slug] || 0,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)
}
