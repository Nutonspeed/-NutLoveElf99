"use client"

import { useEffect, useState, useRef } from 'react'
import BillClientInteraction from '@/components/BillClientInteraction'
import BillTimeline from '@/components/bill/BillTimeline'
import EditAddressForm from '@/components/bill/EditAddressForm'
import MarkAsPaidButton from '@/components/bill/MarkAsPaidButton'
import { formatDateThai } from '@/lib/formatDateThai'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/button'
import type { FakeBill } from '@/core/mock/fakeBillDB'
import { getBillById } from '@/core/mock/fakeBillDB'
import { useBillSync } from '@/hooks/useBillSync'
import type { Metadata } from 'next'
import { getCustomerById } from '@/core/mock/fakeCustomerDB'
import type { Customer } from '@/types/customer'

export async function generateMetadata({ params }: { params: { billId: string } }): Promise<Metadata> {
  const bill = await getBillById(params.billId)
  const title = '🧾 บิลของคุณ'
  const description = bill ? `ชำระได้ที่นี่ → ${params.billId}` : 'บิลของคุณ'
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  }
}

export default function BillViewPage({ params }: { params: { billId: string } }) {
  const { billId } = params
  const { bill, isLoading, mutate } = useBillSync(billId)
  const [customer, setCustomer] = useState<Customer | undefined>()
  const [updated, setUpdated] = useState(false)
  const prevRef = useRef<FakeBill | undefined>()

  useEffect(() => {
    if (bill) {
      getCustomerById(bill.customerId).then(c => setCustomer(c))
    }
  }, [bill])

  useEffect(() => {
    if (!bill || !prevRef.current) {
      prevRef.current = bill
      return
    }
    if (JSON.stringify(bill) !== JSON.stringify(prevRef.current)) {
      setUpdated(true)
      if (bill.status !== prevRef.current.status) {
        document.getElementById('bill-timeline')?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    prevRef.current = bill
  }, [bill])

  useEffect(() => {
    if (updated) {
      const t = setTimeout(() => setUpdated(false), 3000)
      return () => clearTimeout(t)
    }
  }, [updated])

  if (isLoading) {
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
        name={customer?.name || bill.customerName}
        phone={customer?.phone || bill.customerPhone}
        address={customer?.address || bill.customerAddress}
        delivered={bill.delivered}
        status={bill.status}
      />
      {updated && (
        <div className="text-sm text-center text-blue-600">มีการอัปเดตใหม่แล้ว</div>
      )}
      <BillTimeline status={bill.status} />
      <MarkAsPaidButton billId={bill.id} status={bill.status} onPaid={() => mutate()} />
      {bill.note && <p className="text-sm">Note: {bill.note}</p>}
      {(bill.trackingNo || bill.deliveryDate) && (
        <div className="text-sm space-y-1">
          {bill.carrier && (
            <p>
              📦 ขนส่ง: {bill.carrier}
              {bill.trackingNo && (
                <>
                  {' '}
                  <a
                    href={
                      bill.carrier === 'Kerry'
                        ? `https://th.kerryexpress.com/th/track/?track=${bill.trackingNo}`
                        : undefined
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 underline"
                  >
                    เช็คสถานะพัสดุ
                  </a>
                </>
              )}
            </p>
          )}
          {bill.trackingNo && <p>🔢 เลขพัสดุ: {bill.trackingNo}</p>}
          {bill.deliveryDate && <p>Delivered: {formatDateThai(bill.deliveryDate)}</p>}
        </div>
      )}
    </div>
  )
}
