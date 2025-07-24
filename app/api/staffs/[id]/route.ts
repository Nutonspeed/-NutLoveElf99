import { join } from 'path'
import { NextResponse } from 'next/server'
import { readJson, writeJson } from '@/lib/server/jsonFile'
import type { Staff } from '@/lib/staff'

const file = join(process.cwd(), 'mock', 'store', 'staffs.json')

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const updates = await req.json()
  const list = await readJson<Staff[]>(file, [])
  const idx = list.findIndex(s => s.id === params.id)
  if (idx === -1) return NextResponse.json({}, { status: 404 })
  list[idx] = { ...list[idx], ...updates }
  await writeJson(file, list)
  return NextResponse.json(list[idx])
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const list = await readJson<Staff[]>(file, [])
  const idx = list.findIndex(s => s.id === params.id)
  if (idx === -1) return NextResponse.json({ success: false }, { status: 404 })
  list.splice(idx, 1)
  await writeJson(file, list)
  return NextResponse.json({ success: true })
}
