import type { AdminBill } from '@/mock/bills'

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export function billToTemplateData(bill: AdminBill) {
  const { id, createdAt, status, paymentStatus, ...rest } = bill
  return rest
}
