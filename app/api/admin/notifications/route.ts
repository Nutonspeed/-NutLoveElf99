import { NextResponse } from 'next/server'
import { join } from 'path'
import { readJson } from '@/lib/jsonFile'

export async function GET() {
  const file = join(process.cwd(), 'mock', 'store', 'notifications.json')
  const data = await readJson<any[]>(file, [])
  return NextResponse.json(data)
}
