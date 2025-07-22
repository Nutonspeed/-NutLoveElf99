export type BillDateFilter = 'today' | '7d' | 'all'

export function filterBillsByDate<T extends { createdAt: string | number | Date }>(
  bills: T[],
  filter: BillDateFilter,
): T[] {
  if (filter === 'all') return bills
  const today = new Date()
  return bills.filter((b) => {
    const created = new Date(b.createdAt)
    if (filter === 'today') {
      return created.toDateString() === today.toDateString()
    }
    if (filter === '7d') {
      return created.getTime() >= today.getTime() - 7 * 86400000
    }
    return true
  })
}
