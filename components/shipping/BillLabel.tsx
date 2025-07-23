import { cn } from '@/lib/utils'
import type { FakeBill } from '@/core/mock/fakeBillDB'
import { Noto_Sans_Thai } from 'next/font/google'
import QRCode from 'react-qr-code'

const thaiFont = Noto_Sans_Thai({ subsets: ['thai'], weight: ['400', '700'] })

interface BillLabelProps {
  bill: FakeBill
  className?: string
}

export default function BillLabel({ bill, className }: BillLabelProps) {
  const summary = bill.items.map(it => `${it.fabricName ?? it.name ?? ''}×${it.quantity}`).join(', ')
  return (
    <div
      className={cn(
        thaiFont.className,
        'border border-black bg-white p-[3mm] w-80 print:w-[100mm] print:h-[150mm] flex flex-col justify-between print:break-after-page',
        className,
      )}
    >
      <div className="space-y-1 text-[14px]">
        <p className="font-bold text-[16px]">{bill.customerName}</p>
        <p className="whitespace-pre-line">{bill.customerAddress}</p>
        <p>โทร {bill.customerPhone}</p>
      </div>
      <div className="text-[12px] space-y-1">
        {summary && <p>สินค้า: {summary}</p>}
        {bill.carrier && (
          <p>
            ขนส่ง: {bill.carrier}{' '}
            {bill.trackingNo && <span>#{bill.trackingNo}</span>}
          </p>
        )}
        {bill.trackingNo && (
          <div className="pt-2">
            <QRCode value={bill.trackingNo} size={64} />
          </div>
        )}
      </div>
      <div className="border border-dashed h-16 mt-2" />
    </div>
  )
}
