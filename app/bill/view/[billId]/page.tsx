"use client"

import { useEffect, useState } from 'react'
import BillClientInteraction from '@/components/BillClientInteraction'
import BillTimeline from '@/components/bill/BillTimeline'
import EditAddressForm from '@/components/bill/EditAddressForm'
import MarkAsPaidButton from '@/components/bill/MarkAsPaidButton'
import { formatDateThai } from '@/lib/formatDateThai'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/button'
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

  return (
    <div className="space-y-6 p-4 print:p-6 print:w-[210mm] print:mx-auto">
      <div className="print:hidden">
        <Link href={`/bill/print/${bill.id}`}>
          <Button variant="outline" size="sm">Print</Button>
        </Link>
      </div>
      <BillClientInteraction bill={bill} />
      <EditAddressForm
        billId={bill.id}
        name={bill.customerName}
        phone={bill.customerPhone}
        address={bill.customerAddress}
        delivered={bill.delivered}
        status={bill.status}
      />
      <BillTimeline status={bill.status} />
      <MarkAsPaidButton billId={bill.id} status={bill.status} onPaid={() => setBill({ ...bill, status: 'paid' })} />
      {bill.note && <p className="text-sm">Note: {bill.note}</p>}
      {(bill.trackingNo || bill.deliveryDate) && (
        <div className="text-sm space-y-1">
          {bill.trackingNo && <p>Tracking: {bill.trackingNo}</p>}
          {bill.deliveryDate && <p>Delivered: {formatDateThai(bill.deliveryDate)}</p>}
        </div>
      )}
    </div>
  )
}
