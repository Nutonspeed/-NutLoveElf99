import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'
import { readJson } from '@/lib/jsonStore'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date') || ''
  const dir = join(process.cwd(), 'mock', 'store')
  const orders = await readJson<any[]>(join(dir, 'orders.json'), [])
  const list = orders.filter(o => date && o.createdAt?.startsWith(date))
  const total = list.reduce((s, o) => s + (o.total || 0), 0)
  return NextResponse.json({ orders: list.length, revenue: total })
}
