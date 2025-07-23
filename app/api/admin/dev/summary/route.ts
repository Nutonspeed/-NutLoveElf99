import { NextResponse } from 'next/server'
import { join } from 'path'
import { readJson } from '@/lib/jsonFile'

function billTotal(b: any) {
  return (b.items || []).reduce((s: number, i: any) => s + i.price * i.quantity, 0) + (b.shipping || 0)
}

export async function GET() {
  const dir = join(process.cwd(), 'mock', 'store')
  const orders = await readJson<any[]>(join(dir, 'orders.json'), [])
  const bills = await readJson<any[]>(join(dir, 'bills.json'), [])
  const feedback = await readJson<any[]>(join(dir, 'feedback.json'), [])
  const exportLogs = await readJson<any[]>(join(dir, 'export-log.json'), [])
  const revenue = bills.reduce((s, b) => s + billTotal(b), 0)
  return NextResponse.json({
    orders: orders.length,
    revenue,
    feedback: feedback.length,
    exportLogs
  })
}
