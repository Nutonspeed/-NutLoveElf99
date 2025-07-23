import { cn } from '@/lib/utils'
import type { FakeBill } from '@/core/mock/fakeBillDB'

interface BillLabelProps {
  bill: FakeBill
  className?: string
}

export default function BillLabel({ bill, className }: BillLabelProps) {
  const summary = bill.items.map(it => `${it.fabricName ?? it.name ?? ''}×${it.quantity}`).join(', ')
  return (
    <div
      className={cn(
        'border p-4 w-80 print:w-[100mm] print:h-[150mm] flex flex-col justify-between',
        className,
      )}
    >
      <div className="space-y-1 text-sm">
        <p className="font-bold text-lg">{bill.customerName}</p>
        <p className="whitespace-pre-line">{bill.customerAddress}</p>
        <p>โทร {bill.customerPhone}</p>
      </div>
      <div className="text-sm space-y-1">
        {summary && <p>สินค้า: {summary}</p>}
        {bill.carrier && (
          <p>
            ขนส่ง: {bill.carrier}{' '}
            {bill.trackingNo && <span>#{bill.trackingNo}</span>}
          </p>
        )}
      </div>
    </div>
  )
}
