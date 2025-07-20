import { NextResponse } from 'next/server'
import { mockBills } from '@/lib/mock-bills'
import { mockOrders } from '@/lib/mock-orders'
import { addMetricsLog } from '@/lib/mock-metrics-logs'

function billAmount(bill: { orderId: string }) {
  const order = mockOrders.find(o => o.id === bill.orderId)
  return order?.totalAmount ?? order?.total ?? 0
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const apiKey = req.headers.get('x-api-key')
  if (process.env.METRICS_API_KEY && apiKey !== process.env.METRICS_API_KEY) {
    return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 })
  }

  let bills = [...mockBills]

  const start = searchParams.get('start')
  const end = searchParams.get('end')
  const tag = searchParams.get('tag')

  if (start && end) {
    const s = new Date(start)
    const e = new Date(end)
    bills = bills.filter(b => {
      const d = new Date(b.createdAt)
      return d >= s && d <= e
    })
  }

  if (tag) {
    bills = bills.filter(b => (b as any).tag === tag || b.note?.includes(tag))
  }

  const totalBilled = bills.reduce((sum, b) => sum + billAmount(b), 0)
  const totalPaid = bills
    .filter(b => b.status === 'paid')
    .reduce((sum, b) => sum + billAmount(b), 0)

  const overdueCount = bills.filter(
    b => b.status === 'unpaid' && b.dueDate && new Date(b.dueDate) < new Date(),
  ).length
  const overdueRate = bills.length ? overdueCount / bills.length : 0

  const times: number[] = []
  bills.forEach(b => {
    if (b.payments && b.payments.length > 0) {
      const t =
        new Date(b.payments[0].date).getTime() - new Date(b.createdAt).getTime()
      times.push(t)
    }
  })
  const avgPaymentTime = times.length ? times.reduce((a, b) => a + b, 0) / times.length / 86400000 : 0

  addMetricsLog('/api/metrics/billing', req.headers.get('origin') || '')

  return NextResponse.json({
    success: true,
    totalBilled,
    totalPaid,
    overdueRate,
    avgPaymentTime,
  })
}
