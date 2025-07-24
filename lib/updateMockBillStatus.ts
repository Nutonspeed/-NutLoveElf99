export function updateMockBillStatus(id: string, status: string) {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem('mockStore_bills')
    const bills = raw ? JSON.parse(raw) : []
    const idx = bills.findIndex((b: any) => b.id === id)
    if (idx !== -1) {
      bills[idx].status = status
      localStorage.setItem('mockStore_bills', JSON.stringify(bills))
    }
  } catch {
    // ignore
  }
}
