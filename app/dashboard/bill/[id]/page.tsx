import CopyLinkButton from '@/components/bill/CopyLinkButton'
import QRCodePlaceholder from '@/components/bill/QRCodePlaceholder'
import PaidStatusToggle from '@/components/bill/PaidStatusToggle'
import { getBill } from '@/mock/bills'

interface Props {
  params: { id: string }
}

export default function DashboardBillPage({ params }: Props) {
  const bill = getBill(params.id)
  if (!bill) {
    return <div className="p-8">ไม่พบใบเสร็จนี้</div>
  }
  const total = bill.items.reduce((sum, it) => sum + it.price * it.quantity, 0) + bill.shipping
  return (
    <div className="container mx-auto space-y-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ใบเสร็จ {bill.id}</h1>
        <CopyLinkButton link={`https://example.com/bill/${bill.id}`} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          {bill.items.map((it, idx) => (
            <div key={idx} className="flex justify-between border-b pb-2 text-sm">
              <span>
                {it.name} x{it.quantity}
              </span>
              <span>฿{(it.price * it.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between pt-2 font-medium">
            <span>ค่าจัดส่ง</span>
            <span>฿{bill.shipping.toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-t pt-2 text-lg font-bold">
            <span>รวมทั้งหมด</span>
            <span>฿{total.toLocaleString()}</span>
          </div>
        </div>
        <div className="space-y-4">
          <QRCodePlaceholder />
          <PaidStatusToggle defaultPaid={bill.status === 'paid'} />
        </div>
      </div>
    </div>
  )
}
