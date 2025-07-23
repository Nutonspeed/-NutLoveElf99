"use client"

import { useState } from 'react'
import type { BillStatus } from '@/core/mock/fakeBillDB'
import { useToast } from '@/hooks/use-toast'

interface Props {
  billId: string
  status: BillStatus
  onPaid?: () => void
}

export default function MarkAsPaidButton({ billId, status, onPaid }: Props) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [paid, setPaid] = useState(status === 'paid')

  if (paid) {
    return <span className="text-green-600">✅ ชำระแล้ว</span>
  }

  const markPaid = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/bill/update-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billId, newStatus: 'paid' }),
      })
      if (res.ok) {
        setPaid(true)
        onPaid?.()
        toast({ title: 'แจ้งชำระแล้ว' })
      } else {
        toast({ title: 'ไม่สามารถบันทึกได้', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'ไม่สามารถบันทึกได้', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <button type="button" className="border px-3 py-1" disabled={loading} onClick={markPaid}>
      {loading ? 'กำลังบันทึก...' : 'แจ้งโอนแล้ว'}
    </button>
  )
}
