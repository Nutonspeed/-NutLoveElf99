export interface ImportSummary {
  imported: number
  skipped: number
}

export interface ImportResult {
  products: ImportSummary
  fabrics: ImportSummary
  bills: ImportSummary
}

import type { Product } from '@/types/product'
import type { Fabric } from './mock-fabrics'
import type { AdminBill } from '../mock/bills'
import { mockProducts } from './mock-products'
import { mockFabrics } from './mock-fabrics'
import { mockBills } from './mock-bills'

let backup: {
  products: Product[]
  fabrics: Fabric[]
  bills: AdminBill[]
} | null = null

export function importMockData(
  data: any,
  opts: { dryRun?: boolean } = {},
): ImportResult {
  const result: ImportResult = {
    products: { imported: 0, skipped: 0 },
    fabrics: { imported: 0, skipped: 0 },
    bills: { imported: 0, skipped: 0 },
  }
  if (!data || typeof data !== 'object') {
    throw new Error('ไม่สามารถอ่านไฟล์นี้ได้')
  }
  const products: Product[] = Array.isArray(data.products) ? data.products : []
  const fabrics: Fabric[] = Array.isArray(data.fabrics) ? data.fabrics : []
  const bills: AdminBill[] = Array.isArray(data.bills) ? data.bills : []

  if (!opts.dryRun) {
    backup = {
      products: [...mockProducts],
      fabrics: [...mockFabrics],
      bills: [...mockBills],
    }
  }

  for (const p of products) {
    if (mockProducts.find((x) => x.id === p.id)) {
      result.products.skipped++
      continue
    }
    result.products.imported++
    if (!opts.dryRun) mockProducts.push(p)
  }

  for (const f of fabrics) {
    if (mockFabrics.find((x) => x.id === f.id)) {
      result.fabrics.skipped++
      continue
    }
    result.fabrics.imported++
    if (!opts.dryRun) mockFabrics.push(f)
  }

  for (const b of bills) {
    if (mockBills.find((x) => x.id === b.id)) {
      result.bills.skipped++
      continue
    }
    result.bills.imported++
    if (!opts.dryRun) mockBills.push(b)
  }

  return result
}

export function rollbackImport() {
  if (!backup) return
  mockProducts.splice(0, mockProducts.length, ...backup.products)
  mockFabrics.splice(0, mockFabrics.length, ...backup.fabrics)
  mockBills.splice(0, mockBills.length, ...backup.bills)
  backup = null
}
