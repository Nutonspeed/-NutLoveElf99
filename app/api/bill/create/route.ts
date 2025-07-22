import { NextResponse } from 'next/server'
import { BillSchema } from '@/libs/schema/bill'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const dbPath = join(process.cwd(), 'db', 'bill.json')

function ensureFile() {
  if (!existsSync(dbPath)) writeFileSync(dbPath, '[]')
}

export async function POST(req: Request) {
  const body = await req.json()
  const result = BillSchema.safeParse(body)
  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 400 })

  const bill = result.data

  try {
    ensureFile()
    const existing = JSON.parse(readFileSync(dbPath, 'utf8'))
    const id = Date.now().toString()
    const newBill = { id, ...bill }
    existing.push(newBill)
    writeFileSync(dbPath, JSON.stringify(existing, null, 2))
    return NextResponse.json({ success: true, bill: newBill })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
