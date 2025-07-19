import { mockOrders } from '@/core/mock/orders'
import { fabrics } from './mock-fabrics'

export interface FabricRanking { slug: string; name: string; image: string; count: number }

export function getFabricRanking(): FabricRanking[] {
  const counts: Record<string, number> = {}
  mockOrders.forEach(o => {
    o.items.forEach(it => {
      const idx = parseInt(it.productId, 10) - 1
      const fab = fabrics[idx]
      if (fab) counts[fab.slug] = (counts[fab.slug] || 0) + it.quantity
    })
  })
  const list = fabrics.map(f => ({ slug: f.slug, name: f.name, image: f.images[0], count: counts[f.slug] || 0 }))
  list.sort((a, b) => b.count - a.count)
  return list.slice(0, 10)
}
