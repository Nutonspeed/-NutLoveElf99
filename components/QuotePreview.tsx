import type { Quotation } from '@/types/quotation'

export default function QuotePreview({ quotation }: { quotation: Quotation }) {
  const total = quotation.items.reduce(
    (sum, it) => sum + it.price * it.quantity,
    0,
  )
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-center">ใบเสนอราคา {quotation.id}</h1>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">สินค้า</th>
              <th className="p-2 text-center">จำนวน</th>
              <th className="p-2 text-right">ราคา</th>
            </tr>
          </thead>
          <tbody>
            {quotation.items.map((it, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{it.name}</td>
                <td className="p-2 text-center">{it.quantity}</td>
                <td className="p-2 text-right">฿{(it.price * it.quantity).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between p-2 font-semibold border-t">
          <span>รวมทั้งสิ้น</span>
          <span>฿{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
