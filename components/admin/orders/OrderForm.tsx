import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { OrderItemsRepeater } from "@/components/OrderItemsRepeater"
import type { OrderItem, ShippingStatus } from "@/types/order"
import { shippingStatusOptions } from "@/types/order"
import { orderFormSchema } from "@/lib/order/validation"

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
    shipping_status: ShippingStatus
    delivery_method: string
    tracking_number: string
    shipping_fee: number
    shipping_date: string
    delivery_note: string
  }) => void
  initialValues?: {
    customerName?: string
    customerPhone?: string
    shipping_status?: ShippingStatus
    delivery_method?: string
    tracking_number?: string
    shipping_fee?: number
    shipping_date?: string
    delivery_note?: string
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
  const [shippingStatus, setShippingStatus] = useState<ShippingStatus>(
    initialValues?.shipping_status ?? "pending",
  )
  const [deliveryMethod, setDeliveryMethod] = useState(
    initialValues?.delivery_method ?? "",
  )
  const [trackingNumber, setTrackingNumber] = useState(
    initialValues?.tracking_number ?? "",
  )
  const [shippingFee, setShippingFee] = useState(
    initialValues?.shipping_fee ?? 0,
  )
  const [shippingDate, setShippingDate] = useState(
    initialValues?.shipping_date ?? "",
  )
  const [deliveryNote, setDeliveryNote] = useState(
    initialValues?.delivery_note ?? "",
  )

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
    const result = orderFormSchema.safeParse({
      customerName,
      customerPhone,
      items,
      discount,
      deposit,
      total,
      totalDue,
      note,
      shipping_status: shippingStatus,
      delivery_method: deliveryMethod,
      tracking_number: trackingNumber,
      shipping_fee: shippingFee,
      shipping_date: shippingDate,
      delivery_note: deliveryNote,
    })
    if (!result.success) {
      console.error(result.error)
      return
    }
    onSave(result.data)
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
          <CardTitle>ข้อมูลการจัดส่ง</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="deliveryMethod">วิธีจัดส่ง</Label>
            <Input
              id="deliveryMethod"
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trackingNumber">เลขติดตามพัสดุ</Label>
            <Input
              id="trackingNumber"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shippingFee">ค่าจัดส่ง</Label>
            <Input
              id="shippingFee"
              type="number"
              value={shippingFee}
              onChange={(e) => setShippingFee(Number.parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shippingDate">วันที่จัดส่ง</Label>
            <Input
              id="shippingDate"
              type="date"
              value={shippingDate}
              onChange={(e) => setShippingDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shippingStatus">สถานะจัดส่ง</Label>
            <Select value={shippingStatus} onValueChange={(v) => setShippingStatus(v as ShippingStatus)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="เลือกสถานะ" />
              </SelectTrigger>
              <SelectContent>
                {shippingStatusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="deliveryNote">หมายเหตุการจัดส่ง</Label>
            <Textarea
              id="deliveryNote"
              value={deliveryNote}
              onChange={(e) => setDeliveryNote(e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

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
