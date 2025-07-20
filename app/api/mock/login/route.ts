import { NextResponse } from 'next/server'
import { mockUsers } from '@/lib/mock-users'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    const user = mockUsers.find(u => u.email === email)
    if (user && password === 'password') {
      const res = NextResponse.json({ success: true, user })
      res.cookies.set('elf_admin_session', '1', { path: '/' })
      return res
    }
    return NextResponse.json({ success: false }, { status: 401 })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
