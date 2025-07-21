import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

const billPath = join(process.cwd(), 'db', 'bill.json')

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const all = JSON.parse(readFileSync(billPath, 'utf8'))
  const found = all.find((b: any) => b.id === id)
  if (!found) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(found)
}
