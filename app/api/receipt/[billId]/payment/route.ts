import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const dbPath = join(process.cwd(), 'mock', 'store', 'payments.json')

function load() {
  if (!existsSync(dbPath)) return [] as any[]
  try {
    return JSON.parse(readFileSync(dbPath, 'utf8'))
  } catch {
    return []
  }
}

export async function GET(_req: Request, { params }: { params: { billId: string } }) {
  const data = load().filter(p => p.billId === params.billId)
  return NextResponse.json(data)
}

export async function POST(req: Request, { params }: { params: { billId: string } }) {
  const body = await req.json()
  const all = load()
  const entry = { id: Date.now().toString(), billId: params.billId, ...body }
  all.push(entry)
  writeFileSync(dbPath, JSON.stringify(all, null, 2))
  return NextResponse.json(entry)
}
