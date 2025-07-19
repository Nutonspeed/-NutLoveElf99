import fs from 'fs/promises'
import path from 'path'

export type FeatureCategory = 'Order' | 'Customer' | 'Product' | 'Payment' | 'Review'

const CATEGORY_PATTERNS: Record<FeatureCategory, RegExp[]> = {
  Order: [/order/, /cart/, /invoice/, /bill/],
  Customer: [/customer/, /profile/, /favorite/, /wishlist/],
  Product: [/product/, /collection/, /sofa/, /compare/],
  Payment: [/checkout/, /payment/, /bill/, /invoice/, /success/],
  Review: [/review/, /feedback/],
}

export async function scanFeatureRoutes(baseDir = path.join(process.cwd(), 'app')) {
  const results: Record<FeatureCategory, string[]> = {
    Order: [],
    Customer: [],
    Product: [],
    Payment: [],
    Review: [],
  }
  async function walk(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        await walk(full)
      } else if (entry.name === 'page.tsx' || entry.name === 'page.ts' || entry.name === 'page.jsx') {
        const rel = path.relative(baseDir, full)
        const route = '/' + path.dirname(rel).replace(/\\/g, '/')
        const cat = categorize(route)
        if (cat) {
          results[cat].push(route)
        }
      }
    }
  }
  await walk(baseDir)
  return results
}

function categorize(route: string): FeatureCategory | null {
  for (const [cat, patterns] of Object.entries(CATEGORY_PATTERNS)) {
    if (patterns.some((p) => p.test(route))) {
      return cat as FeatureCategory
    }
  }
  return null
}
