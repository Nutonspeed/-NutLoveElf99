'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminIndex() {
  const router = useRouter()
  const [detected, setDetected] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      setDetected(window.innerWidth < 768)
    } catch {
      setDetected(null)
    }
  }, [])

  useEffect(() => {
    if (detected === null) return
    if (detected) {
      router.replace('/mobile-home')
    } else {
      router.replace('/admin/dashboard')
    }
  }, [detected, router])

  if (detected === null) {
    return <p className="p-4">แสดงผลในโหมดมือถือ</p>
  }

  return <p className="p-4">redirecting...</p>
}
