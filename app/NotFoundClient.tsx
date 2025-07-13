'use client'
import { useSearchParams } from 'next/navigation'

export default function NotFoundClient() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code') ?? '404'
  return <div>ไม่พบหน้านี้ (code: {code})</div>
}
