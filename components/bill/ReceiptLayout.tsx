import BillPrintLayout from './BillPrintLayout'
import BillHeader from './BillHeader'
import BillItemTable from './BillItemTable'
import BillSummaryTotals from './BillSummaryTotals'
import BillPaymentQR from './BillPaymentQR'
import BillNoteBox from './BillNoteBox'
import BillPrintDate from './BillPrintDate'
import type { AdminBill } from '@/mock/bills'

export default function ReceiptLayout({ bill }: { bill: AdminBill }) {
  const subtotal = bill.items.reduce((s, it) => s + it.price * it.quantity, 0)
  return (
    <BillPrintLayout>
      <BillHeader />
      <BillPrintDate id={bill.id} />
      <BillItemTable items={bill.items} />
      <BillSummaryTotals
        subtotal={subtotal}
        discount={0}
        shipping={bill.shipping}
      />
      <BillPaymentQR value={bill.id} />
      <BillNoteBox note={bill.note} />
    </BillPrintLayout>
  )
}
