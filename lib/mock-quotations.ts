import type { Quotation, QuotationStatus } from '@/types/quotation'

export let quotations: Quotation[] = []

export function loadQuotations() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('mockQuotations')
    if (stored) quotations = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mockQuotations', JSON.stringify(quotations))
  }
}

export function createQuotation(
  data: Omit<Quotation, 'id' | 'status' | 'createdAt'>,
): Quotation {
  const entry: Quotation = {
    ...data,
    id: `q-${Date.now()}`,
    status: 'sent',
    createdAt: new Date().toISOString(),
  }
  quotations = [entry, ...quotations]
  save()
  return entry
}

export function listQuotations(): Quotation[] {
  return quotations
}

export function getQuotation(id: string): Quotation | undefined {
  return quotations.find((q) => q.id === id)
}

export function updateQuotationStatus(id: string, status: QuotationStatus) {
  const q = getQuotation(id)
  if (q) {
    q.status = status
    save()
  }
}
