import { NextResponse } from 'next/server'
import { resolveError } from '@/lib/errorLog'

export async function POST(req: Request) {
  const { id } = await req.json()
  const ok = await resolveError(id)
  return NextResponse.json({ success: ok })
}
