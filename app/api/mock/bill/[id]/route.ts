import { NextResponse } from 'next/server'
import bills from '@/mock/bill.detail.json'

export function GET(_req: Request, { params }: { params: { id: string } }) {
  const bill = (bills as any[]).find((b) => b.id === params.id)
  return NextResponse.json(bill || {})
}
