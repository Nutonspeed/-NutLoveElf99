import { BillItem } from '@/lib/hooks/useBillData'
import { formatCurrencyTHB } from '@/lib/format/currency'
import PrintTableFrame from '@/components/ui/PrintTableFrame'

export default function BillItemTable({ items }: { items: BillItem[] }) {
  return (
    <PrintTableFrame>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">สินค้า</th>
            <th className="text-center py-2">จำนวน</th>
            <th className="text-right py-2">ราคา</th>
            <th className="text-right py-2">รวม</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i} className="border-b last:border-b-0">
              <td className="py-1">{it.name}</td>
              <td className="text-center py-1">{it.quantity}</td>
              <td className="text-right py-1">{formatCurrencyTHB(it.price)}</td>
              <td className="text-right py-1">
                {formatCurrencyTHB(it.price * it.quantity)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </PrintTableFrame>
  )
}
