import { mockCustomers, getCustomerOrders } from './mock-customers'

export interface SegmentRule {
  id: string
  threshold: number
  tag: string
}

export let segmentRules: SegmentRule[] = [
  { id: 'vip', threshold: 5, tag: 'VIP' },
]

export function loadSegmentRules() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('segmentRules')
    if (stored) segmentRules = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('segmentRules', JSON.stringify(segmentRules))
  }
}

export function addSegmentRule(rule: Omit<SegmentRule, 'id'>): SegmentRule {
  const entry: SegmentRule = { id: Date.now().toString(), ...rule }
  segmentRules.push(entry)
  save()
  return entry
}

export function removeSegmentRule(id: string) {
  segmentRules = segmentRules.filter((r) => r.id !== id)
  save()
}

export function runSegmentation() {
  mockCustomers.forEach((c) => {
    segmentRules.forEach((r) => {
      const count = getCustomerOrders(c.id).length
      if (count >= r.threshold) {
        if (!c.tags) c.tags = []
        if (!c.tags.includes(r.tag)) c.tags.push(r.tag)
      }
    })
  })
}
