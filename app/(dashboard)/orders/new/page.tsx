"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface Item {
  name: string
  price: number
  quantity: number
}

export default function NewOrderPage() {
  const router = useRouter()
  const [customerName, setCustomerName] = useState("")
  const [customerContact, setCustomerContact] = useState("")
  const [items, setItems] = useState<Item[]>([{ name: "", price: 0, quantity: 1 }])
  const [discount, setDiscount] = useState(0)
  const [deposit, setDeposit] = useState(0)
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal - discount - deposit

  const updateItem = (index: number, field: keyof Item, value: string) => {
    setItems(items.map((it, i) => (i === index ? { ...it, [field]: field === "name" ? value : Number(value) } : it)))
  }

  const addItem = () => setItems([...items, { name: "", price: 0, quantity: 1 }])
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index))

  const saveOrder = async () => {
    if (!customerName || !customerContact || items.length === 0) {
      toast.error("กรอกข้อมูลให้ครบ")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName,
          customer_contact: customerContact,
          items,
          discount,
          deposit,
          note
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "error")
      toast.success("บันทึกบิลแล้ว")
      router.push(`/bill/${data.order.id}`)
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-2xl py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>เปิดบิลลูกค้า</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>ชื่อลูกค้า</Label>
            <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          </div>
          <div>
            <Label>เบอร์โทร</Label>
            <Input value={customerContact} onChange={(e) => setCustomerContact(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>รายการสินค้า</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-6 gap-2 items-end">
              <Input
                className="col-span-3"
                placeholder="ชื่อสินค้า"
                value={item.name}
                onChange={(e) => updateItem(idx, "name", e.target.value)}
              />
              <Input
                type="number"
                className="col-span-2"
                placeholder="ราคา"
                value={item.price}
                onChange={(e) => updateItem(idx, "price", e.target.value)}
              />
              <Input
                type="number"
                className="col-span-1"
                placeholder="จำนวน"
                value={item.quantity}
                onChange={(e) => updateItem(idx, "quantity", e.target.value)}
              />
              {items.length > 1 && (
                <Button type="button" variant="ghost" onClick={() => removeItem(idx)} className="col-span-6 text-red-500">
                  ลบรายการ
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addItem}>
            เพิ่มสินค้า
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>สรุปยอด</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>ยอดรวมสินค้า</span>
            <span>฿{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <Label className="mr-2">ส่วนลด</Label>
            <Input type="number" className="w-32" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
          </div>
          <div className="flex justify-between items-center">
            <Label className="mr-2">มัดจำ</Label>
            <Input type="number" className="w-32" value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} />
          </div>
          <div className="flex justify-between font-bold border-t pt-2">
            <span>ยอดสุทธิ</span>
            <span>฿{total.toLocaleString()}</span>
          </div>
          <div>
            <Label>หมายเหตุ</Label>
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} />
          </div>
          <Button className="w-full" onClick={saveOrder} disabled={loading}>
            บันทึกบิล
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
