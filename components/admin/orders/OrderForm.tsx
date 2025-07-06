import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { OrderItemForm } from "@/components/order/order-item-form"
import type { OrderItem } from "@/types/order"

interface OrderFormProps {
  onSave: (data: {
    customerName: string
    customerPhone: string
    items: OrderItem[]
    deposit: number
    note: string
  }) => void
}

export default function OrderForm({ onSave }: OrderFormProps) {
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [items, setItems] = useState<OrderItem[]>([])
  const [deposit, setDeposit] = useState(0)
  const [note, setNote] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ customerName, customerPhone, items, deposit, note })
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

      <OrderItemForm items={items} onItemsChange={setItems} />

      <Card>
        <CardHeader>
          <CardTitle>การชำระเงินและหมายเหตุ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <div className="pt-4 flex justify-end">
            <Button type="submit">บันทึก</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
