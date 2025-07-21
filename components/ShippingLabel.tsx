import type { AdminBill } from '@/mock/bills'

interface ShippingLabelProps {
  bill: AdminBill
}

export default function ShippingLabel({ bill }: ShippingLabelProps) {
  return (
    <div className="border p-4 w-80 text-sm space-y-1 break-after-page">
      <p className="font-semibold">{bill.customer}</p>
      <p>เลขบิล: {bill.id}</p>
      <p>จำนวนรายการ: {bill.items.length}</p>
      <p>วันที่: {new Date(bill.createdAt).toLocaleDateString('th-TH')}</p>
    </div>
  )
}
