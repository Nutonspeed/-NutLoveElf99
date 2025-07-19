import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { mockCustomers, updateCustomer, removeCustomer } from '@/lib/mock-customers'

const schema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const customer = mockCustomers.find(c => c.id === params.id)
  return customer
    ? NextResponse.json(customer)
    : NextResponse.json({ error: 'not found' }, { status: 404 })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const forbid = requireAdmin(req)
  if (forbid) return forbid
  const body = await req.json()
  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
  }
  const updated = updateCustomer(params.id, result.data)
  return updated
    ? NextResponse.json(updated)
    : NextResponse.json({ error: 'not found' }, { status: 404 })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const forbid = requireAdmin(req)
  if (forbid) return forbid
  removeCustomer(params.id)
  return NextResponse.json({ success: true })
}
