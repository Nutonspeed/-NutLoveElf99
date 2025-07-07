import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { OrderItemsRepeater } from "@/components/OrderItemsRepeater"
import type { OrderItem } from "@/types/order"

interface OrderFormProps {
  onSave: (data: {
    customerName: string
    customerPhone: string
    items: OrderItem[]
    discount: number
    deposit: number
    total: number
    totalDue: number
    note: string
  }) => void
  initialValues?: {
    customerName?: string
    customerPhone?: string
  }
  initialItems?: OrderItem[]
}

export default function OrderForm({ onSave, initialValues, initialItems }: OrderFormProps) {
  const [customerName, setCustomerName] = useState(initialValues?.customerName ?? "")
  const [customerPhone, setCustomerPhone] = useState(initialValues?.customerPhone ?? "")
  const [items, setItems] = useState<OrderItem[]>(initialItems ?? [])
  const [deposit, setDeposit] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [totalDue, setTotalDue] = useState(0)
  const [note, setNote] = useState("")

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + item.price * item.quantity * (1 - (item.discount ?? 0) / 100),
        0,
      ),
    [items],
  )
  const total = useMemo(
    () => subtotal - (subtotal * discount) / 100,
    [subtotal, discount],
  )

  useEffect(() => {
    setTotalDue(total * (deposit / 100))
  }, [total, deposit])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      customerName,
      customerPhone,
      items,
      discount,
      deposit,
      total,
      totalDue,
      note,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลลูกค้า</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">ชื่อลูกค้า</Label>
            <Input
              id="name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">เบอร์โทร</Label>
            <Input
              id="phone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              required
            />
          </div>
        </CardContent>
      </Card>

      <OrderItemsRepeater items={items} onItemsChange={setItems} />

      <Card>
        <CardHeader>
          <CardTitle>การชำระเงินและหมายเหตุ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="discount">ส่วนลด (%)</Label>
            <Input
              id="discount"
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(Number.parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deposit">มัดจำ (%)</Label>
            <Input
              id="deposit"
              type="number"
              min="0"
              max="100"
              value={deposit}
              onChange={(e) => setDeposit(Number.parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="note">หมายเหตุ</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-1 border-t pt-4 text-sm">
            <div className="flex justify-between">
              <span>ยอดรวมสินค้า:</span>
              <span>฿{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>ยอดสุทธิหลังส่วนลด:</span>
              <span>฿{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>ยอดมัดจำที่ต้องชำระ:</span>
              <span>฿{totalDue.toLocaleString()}</span>
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <Button type="submit">บันทึก</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
