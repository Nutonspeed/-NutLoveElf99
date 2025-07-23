"use client"

import { useState } from 'react'
import BillStatusDropdown from './bills/BillStatusDropdown'
import type { AdminBill } from '@/mock/bills'
import { useBillStore } from '@/core/store'
import { useToast } from '@/hooks/use-toast'

interface Props {
  billId: string
  status: AdminBill['status']
}

export default function BillStatusControl({ billId, status }: Props) {
  const store = useBillStore()
  const { toast } = useToast()
  const [value, setValue] = useState(status)

  const update = async (newStatus: AdminBill['status']) => {
    setValue(newStatus)
    try {
      const res = await fetch('/api/bill/update-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billId, newStatus }),
      })
      if (res.ok) {
        store.updateStatus(billId, newStatus)
        toast({ title: 'อัปเดตสถานะแล้ว' })
      } else {
        toast({ title: 'อัปเดตไม่สำเร็จ', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'อัปเดตไม่สำเร็จ', variant: 'destructive' })
    }
  }

  return <BillStatusDropdown status={value} onChange={update} />
}
