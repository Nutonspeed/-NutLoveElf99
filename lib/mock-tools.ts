import { mockProducts } from './mock-products'
import { mockBills } from './bills'
import { fabrics } from './mock-fabrics'
import { downloadJSON } from './mock-export'

export function clearMockData() {
  mockProducts.splice(0, mockProducts.length)
  mockBills.splice(0, mockBills.length)
  fabrics.splice(0, fabrics.length)
}

export interface MappingEntry {
  mockID: string
  supaID: string | null
}

export function getMockMappingPlan(): MappingEntry[] {
  return [
    ...mockBills.map((b) => ({ mockID: b.id, supaID: null })),
    ...mockProducts.map((p) => ({ mockID: p.id, supaID: null })),
    ...fabrics.map((f) => ({ mockID: f.id, supaID: null })),
  ]
}

export function downloadMockMappingPlan() {
  downloadJSON(getMockMappingPlan(), 'mapping-plan.json')
}
