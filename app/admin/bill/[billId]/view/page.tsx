"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/button'
import BillHeader from '@/components/bill/BillHeader'
import BillItemTable from '@/components/bill/BillItemTable'
import BillSummaryTotals from '@/components/bill/BillSummaryTotals'
import BillNoteBox from '@/components/bill/BillNoteBox'
import { useBillData } from '@/lib/hooks/useBillData'

export default function AdminBillView({ params }: { params: { billId: string } }) {
  const bill = useBillData(params.billId)

  if (!bill) {
    return <div className="p-4 text-center">Loading...</div>
  }

  const subtotal = bill.items.reduce((s, it) => s + it.price * it.quantity, 0)

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">บิล {bill.id}</h1>
        <Button variant="outline" onClick={() => window.open(`/admin/bill/${bill.id}/print`, '_blank')}>
          พิมพ์ใบเสร็จ
        </Button>
      </div>
      <BillHeader />
      <BillItemTable items={bill.items} />
      <BillSummaryTotals subtotal={subtotal} discount={bill.discount} shipping={bill.shipping} />
      <BillNoteBox note={bill.note} />
      <Link href="/admin/bills" className="block mt-4">
        <Button variant="outline">กลับรายการบิล</Button>
      </Link>
    </div>
  )
}
