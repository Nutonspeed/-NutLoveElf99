import { formatCurrencyTHB } from '@/lib/format/currency'

interface Props {
  subtotal: number
  discount?: number
  shipping?: number
}

export default function BillSummaryTotals({ subtotal, discount = 0, shipping = 0 }: Props) {
  const total = subtotal - discount + shipping
  return (
    <div className="mt-4 text-sm space-y-1 w-48 ml-auto">
      <div className="flex justify-between">
        <span>รวม</span>
        <span>{formatCurrencyTHB(subtotal)}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between">
          <span>ส่วนลด</span>
          <span>-{formatCurrencyTHB(discount)}</span>
        </div>
      )}
      {shipping > 0 && (
        <div className="flex justify-between">
          <span>ค่าจัดส่ง</span>
          <span>{formatCurrencyTHB(shipping)}</span>
        </div>
      )}
      <div className="flex justify-between font-semibold border-t pt-1">
        <span>ยอดสุทธิ</span>
        <span>{formatCurrencyTHB(total)}</span>
      </div>
    </div>
  )
}
