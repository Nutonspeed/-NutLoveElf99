import { promises as fs } from 'fs'
import { join } from 'path'

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
  const file = join(process.cwd(), 'mock', 'store', 'bills.json')
  const text = await fs.readFile(file, 'utf8')
  const all = JSON.parse(text) as ReportBill[]
  return all.filter(b => b.createdAt.startsWith(date))
}
