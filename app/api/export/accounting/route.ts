import { NextResponse } from 'next/server'
import { join } from 'path'
import { readJson, writeJson } from '@/lib/jsonFile'

function billTotal(b: any) {
  return (b.items || []).reduce((s: number, i: any) => s + i.price * i.quantity, 0) + (b.shipping || 0)
}

export async function GET() {
  const dir = join(process.cwd(), 'mock', 'store')
  const bills = await readJson<any[]>(join(dir, 'bills.json'), [])

  const rows = bills.map(b => ({
    date: (b.createdAt || '').slice(0,10),
    id: b.id,
    total: billTotal(b),
    status: b.status
  }))

  const csv = rows.length
    ? [Object.keys(rows[0]).join(','), ...rows.map(r => `${r.date},${r.id},${r.total},${r.status}`)].join('\n')
    : ''

  const logFile = join(dir, 'export-log.json')
  const log = await readJson<any[]>(logFile, [])
  log.push({ type: 'accounting', date: new Date().toISOString() })
  await writeJson(logFile, log)

  return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv' } })
}
