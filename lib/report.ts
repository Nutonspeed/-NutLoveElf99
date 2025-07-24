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
}

export function billTotal(bill: Pick<ReportBill, 'items' | 'shipping'>) {
  return bill.items.reduce((s, i) => s + i.price * i.quantity, 0) + (bill.shipping || 0)
}

export async function getBillsByDate(date: string): Promise<ReportBill[]> {
  const res = await fetch('/mock/store/bills.json')
  const all = (await res.json()) as ReportBill[]
  return all.filter(b => b.createdAt.startsWith(date))
}
