import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import { getBills } from '@/core/mock/store'
import { generateReceiptPDF } from '@/lib/pdf/receipt'

const logPath = join(process.cwd(), 'db', 'pdf-log.json')

function loadLog() {
  if (!existsSync(logPath)) return [] as any[]
  try {
    return JSON.parse(readFileSync(logPath, 'utf8'))
  } catch { return [] }
}

export async function GET(_req: Request, { params }: { params: { billId: string } }) {
  const bill = getBills().find(b => b.id === params.billId)
  if (!bill) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const blob = await generateReceiptPDF(bill as any, { mock: true })
  const buffer = Buffer.from(await blob.arrayBuffer())
  const log = loadLog()
  log.push({ billId: params.billId, date: new Date().toISOString() })
  writeFileSync(logPath, JSON.stringify(log, null, 2))
  return new NextResponse(buffer, { headers: { 'Content-Type': 'application/pdf' } })
}
