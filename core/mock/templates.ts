import type { AdminBill } from '@/mock/bills'
import { loadFromStorage, saveToStorage } from './store/persist'

export interface BillTemplate {
  slug: string
  name: string
  bill: Omit<AdminBill, 'id' | 'createdAt' | 'status' | 'paymentStatus'>
}

const KEY = 'mock_templates'
let templates: BillTemplate[] = loadFromStorage<BillTemplate[]>(KEY, [])

function persist() {
  saveToStorage(KEY, templates)
}

export function listTemplates() {
  return templates
}

export function getTemplate(slug: string) {
  return templates.find(t => t.slug === slug)
}

export function saveTemplate(t: BillTemplate) {
  const idx = templates.findIndex(x => x.slug === t.slug)
  if (idx !== -1) templates[idx] = t
  else templates.push(t)
  persist()
}
