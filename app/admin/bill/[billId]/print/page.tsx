"use client"
import { useRef } from "react"
import BillPrintLayout from '@/components/bill/BillPrintLayout'
import BillHeader from '@/components/bill/BillHeader'
import BillItemTable from '@/components/bill/BillItemTable'
import BillSummaryTotals from '@/components/bill/BillSummaryTotals'
import BillPaymentQR from '@/components/bill/BillPaymentQR'
import BillNoteBox from '@/components/bill/BillNoteBox'
import BillPrintDate from '@/components/bill/BillPrintDate'
import BillPrintActions from '@/components/bill/BillPrintActions'
import { useBillData } from '@/lib/hooks/useBillData'

export default function AdminBillPrint({ params }: { params: { billId: string } }) {
  const bill = useBillData(params.billId)
  const printRef = useRef<HTMLDivElement>(null)

  if (!bill) {
    return <div className="p-4 text-center">Loading...</div>
  }

  const subtotal = bill.items.reduce((s, it) => s + it.price * it.quantity, 0)

  return (
    <div ref={printRef} data-printable="bill">
      <BillPrintLayout>
        <BillPrintActions />
        <BillHeader />
        <BillPrintDate id={bill.id} />
        <div data-printable="items">
          <BillItemTable items={bill.items} />
        </div>
        <div data-printable="summary">
          <BillSummaryTotals subtotal={subtotal} discount={bill.discount} shipping={bill.shipping} />
        </div>
        <BillPaymentQR value={bill.id} />
        <BillNoteBox note={bill.note} />
      </BillPrintLayout>
    </div>
  )
}
