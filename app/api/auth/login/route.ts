import { NextResponse, type NextRequest } from 'next/server'
import { mockUsers } from '@/lib/mock-users'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()
  const user = mockUsers.find(u => u.email === email)
  if (user && password === 'password') {
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64')
    return NextResponse.json({ success: true, token, user })
  }
  return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
}
