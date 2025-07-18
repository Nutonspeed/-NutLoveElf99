import CopyLinkButton from '@/components/bills/CopyLinkButton'
import QRCodePlaceholder from '@/components/bills/QRCodePlaceholder'
import PaidStatusToggle from '@/components/bills/PaidStatusToggle'
import { getBill, updateBillStatus } from '@/mock/bills'

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
      <h1 className="text-2xl font-bold">ใบเสร็จ {bill.id}</h1>
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
        </div>
      </div>
      <div className="flex items-center justify-between border-t pt-4">
        <CopyLinkButton link={`https://example.com/bill/${bill.id}`} />
        <div className="space-y-1 text-right">
          <PaidStatusToggle
            defaultPaid={bill.status === 'paid'}
            onChange={(paid) =>
              updateBillStatus(bill.id, paid ? 'paid' : 'unpaid')
            }
          />
          <p className="text-xs text-muted-foreground">แก้ไขล่าสุด: 2024-05-01</p>
        </div>
      </div>
    </div>
  )
}
