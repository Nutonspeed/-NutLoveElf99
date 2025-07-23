"use client"

import { useEffect, useState } from 'react'
import BillClientInteraction from '@/components/BillClientInteraction'
import type { FakeBill } from '@/core/mock/fakeBillDB'
import { getBillById } from '@/core/mock/fakeBillDB'

export default function BillViewPage({ params }: { params: { billId: string } }) {
  const { billId } = params
  const [bill, setBill] = useState<FakeBill | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBillById(billId).then(b => {
      setBill(b)
      setLoading(false)
    })
  }, [billId])

  if (loading) {
    return <div className="p-8">Loading…</div>
  }

  if (!bill) {
    return <div className="p-8">ไม่พบบิลนี้</div>
  }

  return <BillClientInteraction bill={bill} />
}
