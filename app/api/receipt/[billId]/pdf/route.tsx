import { NextResponse } from 'next/server'
import React from 'react'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import { getPaidBill } from '@/lib/receipt'
import ReceiptLayout from '@/components/receipt/ReceiptLayout'
import { componentToPDF } from '@/lib/pdf/from-html'

const logPath = join(process.cwd(), 'mock', 'store', 'pdf-log.json')

function loadLog() {
  if (!existsSync(logPath)) return [] as any[]
  try {
    return JSON.parse(readFileSync(logPath, 'utf8'))
  } catch { return [] }
}

export async function GET(_req: Request, { params }: { params: { billId: string } }) {
  const bill = getPaidBill(params.billId)
  if (!bill) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const blob = await componentToPDF(<ReceiptLayout bill={bill as any} />)
  const buffer = Buffer.from(await blob.arrayBuffer())
  const log = loadLog()
  log.push({ billId: params.billId, date: new Date().toISOString() })
  writeFileSync(logPath, JSON.stringify(log, null, 2))
  return new NextResponse(buffer, { headers: { 'Content-Type': 'application/pdf' } })
}
