import type { Tier } from '@/types/tier'

export const mockTiers: Tier[] = [
  { name: 'Silver', minSpent: 0, minOrders: 0 },
  { name: 'Gold', minSpent: 10000, minOrders: 5 },
  { name: 'Platinum', minSpent: 30000, minOrders: 10 },
]
