import { NextResponse } from 'next/server'
import { getStoreProfile, setStoreProfile } from '@/core/mock/store'
import type { StoreProfile } from '@/core/mock/store/store-profile'

export async function GET() {
  return NextResponse.json(getStoreProfile())
}

export async function POST(req: Request) {
  try {
    const data: StoreProfile = await req.json()
    setStoreProfile(data)
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Save store profile error', e)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
