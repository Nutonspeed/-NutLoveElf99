import { Separator } from "@/components/ui/separator"
import type { Order } from "@/lib/mock-orders"

interface BillPreviewProps {
  order: Order
}

export default function BillPreview({ order }: BillPreviewProps) {
  const tax = Math.round(order.total * 0.07)
  const subtotal = order.total - tax
  const depositPercent = order.depositPercent ?? 100
  const depositAmount = Math.round((order.total * depositPercent) / 100)
  const remaining = order.total - depositAmount

  return (
    <>
      {/* Company Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">SC</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">SofaCover Pro</h2>
              <p className="text-gray-600">ผ้าคลุมโซฟาคุณภาพพรีเมียม</p>
            </div>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p>123 ถนนสุขุมวิท แขวงคลองตัน</p>
            <p>เขตวัฒนา กรุงเทพฯ 10110</p>
            <p>โทร: 02-123-4567</p>
            <p>อีเมล: info@sofacover.com</p>
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-3xl font-bold text-primary mb-2">บิลการสั่งซื้อ</h1>
          <div className="text-sm space-y-1">
            <p>
              <strong>เลขที่:</strong> {order.id}
            </p>
            <p>
              <strong>วันที่:</strong> {new Date(order.createdAt).toLocaleDateString("th-TH")}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-semibold text-lg mb-3">ลูกค้า</h3>
          <div className="space-y-1 text-sm">
            <p className="font-medium">{order.customerName}</p>
            <p>{order.customerEmail}</p>
            <p>{order.shippingAddress.phone}</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-3">ที่อยู่จัดส่ง</h3>
          <div className="space-y-1 text-sm">
            <p>{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city} {order.shippingAddress.postalCode}
            </p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 font-semibold">รายการ</th>
              <th className="text-center py-3 font-semibold">จำนวน</th>
              <th className="text-right py-3 font-semibold">ราคาต่อหน่วย</th>
              <th className="text-right py-3 font-semibold">รวม</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-4">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <div className="text-sm text-gray-600">
                      {item.size && <span>ขนาด: {item.size}</span>}
                      {item.color && <span> | สี: {item.color}</span>}
                    </div>
                  </div>
                </td>
                <td className="text-center py-4">{item.quantity}</td>
                <td className="text-right py-4">฿{item.price.toLocaleString()}</td>
                <td className="text-right py-4 font-medium">฿{(item.price * item.quantity).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-80">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>ยอดรวมสินค้า:</span>
              <span>฿{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>ภาษีมูลค่าเพิ่ม (7%):</span>
              <span>฿{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>ค่าจัดส่ง:</span>
              <span>฿{order.shipping_fee.toLocaleString()}</span>
            </div>
            {depositPercent < 100 && (
              <div className="flex justify-between">
                <span>ยอดมัดจำ ({depositPercent}%):</span>
                <span>฿{depositAmount.toLocaleString()}</span>
              </div>
            )}
            {depositPercent < 100 && (
              <div className="flex justify-between">
                <span>ยอดคงเหลือ:</span>
                <span>฿{remaining.toLocaleString()}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>ยอดรวมทั้งสิ้น:</span>
              <span className="text-primary">฿{order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
        <p>กรุณาชำระเงินตามยอดที่แจ้ง</p>
        <p>SofaCover Pro - ผู้นำด้านผ้าคลุมโซฟาคุณภาพสูง</p>
      </div>
    </>
  )
}
