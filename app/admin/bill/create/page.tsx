"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { OrderItemsRepeater } from "@/components/OrderItemsRepeater"
import { OrderSummary } from "@/components/order/order-summary"
import BillSummary, { getSubtotal, calculateTotal } from "@/components/admin/bill/BillSummary"
import BillFooterActions from "@/components/bill/BillFooterActions"
import { useBillStore } from "@/core/store/bills"
import { orderDb } from "@/lib/order-database"
import { createBill } from "@/lib/mock-bills"
import type { OrderItem } from "@/types/order"
import { toast } from "sonner"

export default function AdminBillCreatePage() {
  const router = useRouter()
  const store = useBillStore()
  const [items, setItems] = useState<OrderItem[]>([])
  const [discount, setDiscount] = useState(0)
  const [shippingCost, setShippingCost] = useState(0)
  const [tax, setTax] = useState(0)
  const [loading, setLoading] = useState(false)

  const subtotal = getSubtotal(items)
  const total = calculateTotal(items, shippingCost, discount) + tax

  const validate = () => {
    if (items.length === 0) {
      toast.error("ต้องมีสินค้าอย่างน้อย 1 รายการ")
      return false
    }
    return true
  }

  const create = async () => {
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
      store.addBill({
        id: bill.id,
        customer: "ลูกค้าทั่วไป",
        items: items.map((it) => ({
          name: it.productName,
          quantity: it.quantity,
          price: it.price,
        })),
        shipping: shippingCost,
        note: "",
        tags: [],
      })
      toast.success("สร้างบิลสำเร็จ")
      router.push("/admin/bills")
    } catch (e) {
      toast.error("เกิดข้อผิดพลาด")
    } finally {
      setLoading(false)
    }
  }

  const clearForm = () => {
    setItems([])
    setDiscount(0)
    setShippingCost(0)
    setTax(0)
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
              <CardContent>
                <BillFooterActions
                  validate={validate}
                  onSubmit={create}
                  onClear={clearForm}
                  submitting={loading}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="max-w-md mx-auto lg:max-w-none">
          <BillSummary items={items} discount={discount} shipping={shippingCost} />
        </div>
      </div>
    </div>
  )
}
