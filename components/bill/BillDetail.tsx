"use client"
import { useBill } from '@/libs/hooks/useBill'

export default function BillDetail({ id }: { id: string }) {
  const { bill, isLoading } = useBill(id)
  if (isLoading) return <p>Loading...</p>
  if (!bill) return <p>ไม่พบข้อมูล</p>

  return (
    <div className="space-y-2">
      <p>ลูกค้า: {bill.customerName}</p>
      <p>ยอดรวม: {bill.total}</p>
      <p>ชำระด้วย: {bill.paymentMethod}</p>
    </div>
  )
}
