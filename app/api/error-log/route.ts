import { NextResponse } from 'next/server'
import { logError } from '@/lib/errorLog'

export async function POST(req: Request) {
  const data = await req.json()
  const entry = await logError(data)
  return NextResponse.json(entry)
}
