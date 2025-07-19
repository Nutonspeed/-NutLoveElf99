import { NextRequest, NextResponse } from 'next/server'
import { mockUsers } from '@/lib/mock-users'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const user = mockUsers.find(u => u.email === email)
  if (!user || password !== 'password') {
    return NextResponse.json({ success: false }, { status: 401 })
  }
  const res = NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  res.cookies.set('role', user.role, { path: '/' })
  res.cookies.set('elf_admin_session', '1', { path: '/' })
  return res
}
