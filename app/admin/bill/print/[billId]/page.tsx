"use client"
import ReceiptLayout from '@/components/bill/ReceiptLayout'
import PrintToolbar from '@/components/bill/PrintToolbar'
import { useBillById } from '@/hooks/useBillById'

export default function BillPrintPage({ params }: { params: { billId: string } }) {
  const bill = useBillById(params.billId)

  if (bill === undefined) {
    return <div className="p-4 text-center">ไม่พบบิล</div>
  }

  if (!bill) {
    return <div className="p-4 text-center">Loading...</div>
  }

  return (
    <div className="relative p-4 print:p-0">
      <PrintToolbar />
      <ReceiptLayout bill={bill} />
    </div>
  )
}
