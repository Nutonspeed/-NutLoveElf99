'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export default function NotFoundClient() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const code = searchParams.get('code') ?? '404'
  const force = searchParams.get('forceError') === 'true'

  useEffect(() => {
    if (force) {
      toast({
        title: 'โหมดทดสอบ',
        description: 'Fallback ถูกเรียกใช้งาน',
      })
    }
  }, [force, toast])

  return <div>ไม่พบหน้านี้ (code: {code})</div>
}
