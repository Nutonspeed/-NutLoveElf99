// In serverless environments like Vercel we cannot use Node fs to read
// local files at runtime. Instead load the mock data via fetch so it
// works both during build and in server.

export interface ReportBill {
  id: string
  customer: string
  items: { quantity: number; price: number }[]
  shipping?: number
  status?: string
  paymentStatus?: string
  productionStatus?: string
  createdAt: string
  createdBy?: string
}

export function billTotal(bill: Pick<ReportBill, 'items' | 'shipping'>) {
  return bill.items.reduce((s, i) => s + i.price * i.quantity, 0) + (bill.shipping || 0)
}

export async function getBillsByDate(date: string): Promise<ReportBill[]> {
  const res = await fetch('/mock/store/bills.json')
  const all = (await res.json()) as ReportBill[]
  return all.filter(b => b.createdAt.startsWith(date))
}

export interface StaffSummary {
  staff: string
  count: number
  total: number
  paid: number
  unpaid: number
}

export function summarizeByStaff(bills: ReportBill[]): StaffSummary[] {
  const map = new Map<string, StaffSummary>()
  for (const b of bills) {
    const name = b.createdBy || 'unknown'
    const summary =
      map.get(name) || { staff: name, count: 0, total: 0, paid: 0, unpaid: 0 }
    summary.count += 1
    summary.total += billTotal(b)
    const paid =
      (b.paymentStatus || b.status) === 'paid' || b.status === 'แจ้งโอนแล้ว'
    if (paid) summary.paid += 1
    else summary.unpaid += 1
    map.set(name, summary)
  }
  return Array.from(map.values())
}

export async function getStaffSummary(date?: string): Promise<StaffSummary[]> {
  const res = await fetch('/mock/store/bills.json')
  const all = (await res.json()) as ReportBill[]
  const filtered = date ? all.filter(b => b.createdAt.startsWith(date)) : all
  return summarizeByStaff(filtered)
}
