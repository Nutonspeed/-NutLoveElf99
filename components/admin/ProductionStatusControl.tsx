"use client"
import { useState } from 'react'
import ProductionStatusDropdown from './bills/ProductionStatusDropdown'
import type { AdminBill } from '@/mock/bills'
import { useBillStore } from '@/core/store'
import { useToast } from '@/hooks/use-toast'

interface Props {
  billId: string
  status: NonNullable<AdminBill['productionStatus']>
}

export default function ProductionStatusControl({ billId, status }: Props) {
  const store = useBillStore()
  const { toast } = useToast()
  const [value, setValue] = useState(status)

  const update = async (newStatus: NonNullable<AdminBill['productionStatus']>) => {
    setValue(newStatus)
    try {
      const res = await fetch('/api/bill/update-production-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billId, newStatus }),
      })
      if (res.ok) {
        store.updateProductionStatus(billId, newStatus)
        toast({ title: 'อัปเดตสถานะผลิตแล้ว' })
      } else {
        toast({ title: 'อัปเดตไม่สำเร็จ', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'อัปเดตไม่สำเร็จ', variant: 'destructive' })
    }
  }

  return <ProductionStatusDropdown status={value} onChange={update} />
}
