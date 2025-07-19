import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { mockCustomers, addCustomer } from '@/lib/mock-customers'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
})

function requireAdmin(req: NextRequest) {
  const role = req.headers.get('x-role') || req.cookies.get('role')?.value
  if (role !== 'admin') {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }
  return null
}

export async function GET() {
  return NextResponse.json(mockCustomers)
}

export async function POST(req: NextRequest) {
  const forbid = requireAdmin(req)
  if (forbid) return forbid
  const body = await req.json()
  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
  }
  const customer = addCustomer(result.data)
  return NextResponse.json(customer, { status: 201 })
}
