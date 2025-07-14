"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { OrderItemsRepeater } from "@/components/OrderItemsRepeater"
import { OrderSummary } from "@/components/order/order-summary"
import { orderDb } from "@/lib/order-database"
import { createBill } from "@/lib/mock-bills"
import type { OrderItem } from "@/types/order"
import { toast } from "sonner"

export default function AdminBillCreatePage() {
  const router = useRouter()
  const [items, setItems] = useState<OrderItem[]>([])
  const [discount, setDiscount] = useState(0)
  const [shippingCost, setShippingCost] = useState(0)
  const [tax, setTax] = useState(0)
  const [loading, setLoading] = useState(false)
  const [billLink, setBillLink] = useState<string | null>(null)

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity * (1 - (item.discount ?? 0) / 100),
    0,
  )
  const total = subtotal - discount + shippingCost + tax

  const create = async () => {
    if (items.length === 0) {
      toast.error("ต้องมีสินค้าอย่างน้อย 1 รายการ")
      return
    }
    setLoading(true)
    try {
      const order = await orderDb.createManualOrder({
        items,
        subtotal,
        discount,
        shippingCost,
        tax,
        total,
        status: "pending",
        paymentStatus: "unpaid",
      })
      const bill = createBill(order.id)
      const link = `/bill/${bill.id}`
      setBillLink(link)
      toast.success("สร้างบิลแล้ว")
    } catch (e) {
      toast.error("เกิดข้อผิดพลาด")
    } finally {
      setLoading(false)
    }
  }

  const copyLink = () => {
    if (billLink) {
      navigator.clipboard.writeText(window.location.origin + billLink)
      toast.success("คัดลอกลิงก์แล้ว")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/orders/manual">
            <Button variant="outline" size="icon">
              ←
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">สร้างบิลแมนนวล</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20 lg:pb-0">
          <div className="lg:col-span-2 space-y-6 overflow-y-auto max-h-[60vh]">
            <OrderItemsRepeater items={items} onItemsChange={setItems} />
          </div>
          <div className="space-y-6">
            <OrderSummary
              items={items}
              discount={discount}
              shippingCost={shippingCost}
              tax={tax}
              onDiscountChange={setDiscount}
              onShippingCostChange={setShippingCost}
              onTaxChange={setTax}
            />
            <Card>
              <CardHeader>
                <CardTitle>สร้างบิล</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full hidden sm:block" onClick={create} disabled={loading}>
                  บันทึกบิล
                </Button>
                {billLink && (
                  <div className="space-y-2 text-center">
                    <img
                      className="mx-auto"
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${window.location.origin + billLink}`}
                      alt="QR"
                    />
                    <Button variant="outline" className="w-full" onClick={copyLink}>
                      คัดลอกลิงก์บิล
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <Button className="w-full" onClick={create} disabled={loading}>
            บันทึกบิล
          </Button>
        </div>
      </div>
    </div>
  )
}
