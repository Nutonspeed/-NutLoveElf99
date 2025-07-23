"use client"

import { useEffect, useState } from 'react'
import BillClientInteraction from '@/components/BillClientInteraction'
import type { FakeBill } from '@/core/mock/fakeBillDB'
import { getBillById } from '@/core/mock/fakeBillDB'

export default function BillViewPage({ params }: { params: { billId: string } }) {
  const { billId } = params
  const [bill, setBill] = useState<FakeBill | undefined>()

  useEffect(() => {
    getBillById(billId).then(setBill)
  }, [billId])

  if (!bill) {
    return <div className="p-8">ไม่พบบิลนี้</div>
  }

  return <BillClientInteraction bill={bill} />
}
