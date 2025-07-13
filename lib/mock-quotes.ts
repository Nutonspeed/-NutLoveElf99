import type { Quote, QuoteItem, QuoteStatus } from '@/types/quote'
import { exportCSV } from './mock-export'

export let mockQuotes: Quote[] = []

export function createQuote(customerId: string, items: QuoteItem[]): Quote {
  const quote: Quote = {
    id: `Q-${Date.now()}`,
    customerId,
    items: items.map((i) => ({ ...i })),
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  mockQuotes.push(quote)
  return quote
}

export function getQuote(id: string): Quote | undefined {
  return mockQuotes.find((q) => q.id === id)
}

export function updateQuote(
  id: string,
  data: { status?: QuoteStatus; estimatedTotal?: number; note?: string },
) {
  const q = getQuote(id)
  if (!q) return
  if (data.status) q.status = data.status
  if (typeof data.estimatedTotal !== 'undefined') q.estimatedTotal = data.estimatedTotal
  if (typeof data.note !== 'undefined') q.note = data.note
}

export function exportQuotesCSV(): string {
  return exportCSV(mockQuotes)
}
