import { join } from 'path'
import { NextResponse } from 'next/server'
import { readJson, writeJson } from '@/lib/server/jsonFile'
import type { Staff } from '@/lib/staff'

const file = join(process.cwd(), 'mock', 'store', 'staffs.json')

export async function GET() {
  const list = await readJson<Staff[]>(file, [])
  return NextResponse.json(list)
}

export async function POST(req: Request) {
  const data = (await req.json()) as Omit<Staff, 'id'>
  const list = await readJson<Staff[]>(file, [])
  const staff: Staff = { id: Date.now().toString(), ...data }
  list.push(staff)
  await writeJson(file, list)
  return NextResponse.json(staff)
}
