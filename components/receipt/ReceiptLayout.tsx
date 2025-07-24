import BillPrintLayout from '@/components/bill/BillPrintLayout'
import BillHeader from '@/components/bill/BillHeader'
import BillItemTable from '@/components/bill/BillItemTable'
import BillSummaryTotals from '@/components/bill/BillSummaryTotals'
import BillPaymentQR from '@/components/bill/BillPaymentQR'
import BillNoteBox from '@/components/bill/BillNoteBox'
import BillPrintDate from '@/components/bill/BillPrintDate'
import type { BillData } from '@/lib/hooks/useBillData'

export default function ReceiptLayout({ bill }: { bill: BillData }) {
  const subtotal = bill.items.reduce((s, it) => s + it.price * it.quantity, 0)
  return (
    <BillPrintLayout>
      <BillHeader />
      <BillPrintDate id={bill.id} />
      <BillItemTable items={bill.items} />
      <BillSummaryTotals subtotal={subtotal} discount={bill.discount} shipping={bill.shipping} />
      <BillPaymentQR />
      <BillNoteBox note={bill.note} />
    </BillPrintLayout>
  )
}
