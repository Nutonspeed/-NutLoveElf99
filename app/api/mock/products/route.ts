import { NextResponse } from 'next/server'
import { getProducts, addProduct } from '@/core/mock/store'
import type { Product } from '@/lib/mock-products'

export async function GET() {
  return NextResponse.json(getProducts())
}

export async function POST(req: Request) {
  try {
    const data: Omit<Product, 'id'> = await req.json()
    const product = addProduct(data)
    return NextResponse.json({ success: true, product })
  } catch (e) {
    console.error('Add product error', e)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
