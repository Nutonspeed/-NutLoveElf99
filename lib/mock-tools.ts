import { mockProducts } from './mock-products'
import { mockBills } from './bills'
import { mockFabrics } from './mock-fabrics'
import { downloadJSON } from './mock-export'

export function clearMockData() {
  mockProducts.splice(0, mockProducts.length)
  mockBills.splice(0, mockBills.length)
  mockFabrics.splice(0, mockFabrics.length)
}

export interface MappingEntry {
  mockID: string
  supaID: string | null
}

export function getMockMappingPlan(): MappingEntry[] {
  return [
    ...mockBills.map((b) => ({ mockID: b.id, supaID: null })),
    ...mockProducts.map((p) => ({ mockID: p.id, supaID: null })),
    ...mockFabrics.map((f) => ({ mockID: f.id, supaID: null })),
  ]
}

export function downloadMockMappingPlan() {
  downloadJSON(getMockMappingPlan(), 'mapping-plan.json')
}
