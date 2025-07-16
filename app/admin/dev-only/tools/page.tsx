"use client"
import { useEffect, useState } from 'react'
import { loadTools } from '@/lib/system-tools'

export default function SystemToolsPage() {
  const [error, setError] = useState(false)

  useEffect(() => {
    loadTools().catch(() => setError(true))
  }, [])

  if (error) return <div className="p-4">เครื่องมือระบบไม่พร้อมใช้งาน</div>
  return <div className="p-4">กำลังโหลด...</div>
}
