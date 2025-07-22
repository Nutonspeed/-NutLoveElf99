import type { AdminBill } from '@/mock/bills'

export function sumRevenueByDateRange(bills: AdminBill[], start: Date, end: Date) {
  return bills
    .filter(b => {
      const d = new Date(b.createdAt)
      return d >= start && d <= end && b.status !== 'cancelled'
    })
    .reduce((sum, b) => sum + b.items.reduce((s, it) => s + it.price * it.quantity, 0) + b.shipping, 0)
}
