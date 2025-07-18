import { mockCollections } from './mock-collections'
import { mockFabrics } from './mock-fabrics'
import { mockFabricViews } from './mock-fabric-views'

export interface CollectionViewStat {
  slug: string
  name: string
  views: number
}

export function getCollectionViewStats(): CollectionViewStat[] {
  const totals: Record<string, number> = {}
  for (const f of mockFabrics) {
    const views = mockFabricViews[f.slug] || 0
    totals[f.collectionSlug] = (totals[f.collectionSlug] || 0) + views
  }
  return mockCollections
    .map((c) => ({ slug: c.slug, name: c.name, views: totals[c.slug] || 0 }))
    .sort((a, b) => b.views - a.views)
}
