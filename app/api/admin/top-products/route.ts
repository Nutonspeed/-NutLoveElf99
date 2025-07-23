import { NextRequest, NextResponse } from 'next/server'
import { getTopProducts } from '@/lib/get-top-products'

export async function GET(req: NextRequest) {
  const range = (req.nextUrl.searchParams.get('range') as 'day' | 'month' | 'all') || 'all'
  const data = await getTopProducts(range)
  return NextResponse.json(data)
}
