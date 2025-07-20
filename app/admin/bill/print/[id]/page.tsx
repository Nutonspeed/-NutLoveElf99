"use client"
import BillPrintLayout from '@/components/bill/BillPrintLayout'
import BillHeader from '@/components/bill/BillHeader'
import BillItemTable from '@/components/bill/BillItemTable'
import BillSummaryTotals from '@/components/bill/BillSummaryTotals'
import BillPaymentQR from '@/components/bill/BillPaymentQR'
import BillNoteBox from '@/components/bill/BillNoteBox'
import BillPrintDate from '@/components/bill/BillPrintDate'
import BillPrintActions from '@/components/bill/BillPrintActions'
import { useBillData } from '@/lib/hooks/useBillData'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function BillPrintPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const bill = useBillData(params.id)

  useEffect(() => {
    if (bill === null) {
      router.replace('/admin/bills')
    }
  }, [bill, router])

  if (bill === undefined) {
    return <div className="p-4 text-center">Loading...</div>
  }

  const subtotal = bill.items.reduce((s, it) => s + it.price * it.quantity, 0)

  return (
    <BillPrintLayout>
      <BillPrintActions />
      <BillHeader />
      <BillPrintDate id={bill.id} />
      <BillItemTable items={bill.items} />
      <BillSummaryTotals subtotal={subtotal} discount={bill.discount} shipping={bill.shipping} />
      <BillPaymentQR value={bill.id} />
      <BillNoteBox note={bill.note} />
    </BillPrintLayout>
  )
}
