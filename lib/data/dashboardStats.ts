import { getBills, type BillRecord } from '@/mockDB/bills'
import { getCustomers } from '@/mockDB/customers'

export interface DashboardStats {
  monthSales: number
  totalBills: number
  paidBills: number
  unpaidBills: number
  newCustomers: number
  chartData: { date: string; total: number }[]
  recentBills: BillRecord[]
}

export function getDashboardStats(): DashboardStats {
  const bills = getBills()
  const customers = getCustomers()
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const monthBills = bills.filter(b => new Date(b.createdAt) >= startOfMonth)
  const monthSales = monthBills
    .filter(b => b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + billTotal(b), 0)

  const chartDataMap: Record<string, number> = {}
  monthBills.forEach(b => {
    const d = new Date(b.createdAt)
    const key = d.toLocaleDateString('th-TH', { day: '2-digit' })
    chartDataMap[key] = (chartDataMap[key] || 0) + billTotal(b)
  })
  const chartData = Object.entries(chartDataMap).map(([date, total]) => ({ date, total }))

  const totalBills = bills.length
  const paidBills = bills.filter(b => b.paymentStatus === 'paid').length
  const unpaidBills = bills.filter(b => b.paymentStatus !== 'paid').length
  const newCustomers = customers.filter(c => {
    const date = c.lastOrder ? new Date(c.lastOrder) : null
    return date && date >= startOfMonth
  }).length
  const recentBills = [...bills].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0,5)

  return { monthSales, totalBills, paidBills, unpaidBills, newCustomers, chartData, recentBills }
}

function billTotal(b: BillRecord): number {
  return b.items.reduce((s, i) => s + i.price * i.quantity, 0) + (b.shipping || 0)
}
