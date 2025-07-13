import type { QuoteRequest, QuoteStatus } from '@/types/quote'

export let quotes: QuoteRequest[] = []

export function loadQuotes() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('quotes')
    if (stored) quotes = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('quotes', JSON.stringify(quotes))
  }
}

export function addQuote(data: Omit<QuoteRequest, 'id' | 'status' | 'createdAt'>): QuoteRequest {
  const entry: QuoteRequest = {
    ...data,
    id: Date.now().toString(),
    status: 'new',
    createdAt: new Date().toISOString(),
  }
  quotes = [entry, ...quotes]
  save()
  return entry
}

export function listQuotes(): QuoteRequest[] {
  return quotes
}

export function updateQuoteStatus(id: string, status: QuoteStatus) {
  const q = quotes.find((v) => v.id === id)
  if (q) {
    q.status = status
    save()
  }
}
