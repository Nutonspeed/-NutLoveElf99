"use client"
import { useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Textarea } from "@/components/ui/textarea"
import { OrderItemsRepeater } from "@/components/OrderItemsRepeater"
import type { OrderItem } from "@/types/order"

export default function AdminInvoicesNewPage() {
  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [addressText, setAddressText] = useState("")
  const [recipient, setRecipient] = useState("")
  const [addressLine, setAddressLine] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [items, setItems] = useState<OrderItem[]>([])

  const splitAddress = () => {
    const lines = addressText.split(/\n|,/).map((l) => l.trim()).filter(Boolean)
    setRecipient(lines[0] || customerName)
    setAddressLine(lines[1] || "")
    const cp = lines[2] || ""
    const m = cp.match(/(.+)\s(\d{5})$/)
    if (m) {
      setCity(m[1])
      setPostalCode(m[2])
    } else {
      setCity(cp)
      setPostalCode("")
    }
  }

  const save = () => {
    const data = {
      customerName,
      phone,
      shippingAddress: { name: recipient, address: addressLine, city, postalCode },
      items,
    }
    console.log(data)
    alert("บันทึกบิลแล้ว (demo)")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold">เปิดบิลใหม่</h1>
        <Card className="border">
          <CardHeader>
            <CardTitle>ข้อมูลลูกค้า</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="ชื่อลูกค้า" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            <Input placeholder="เบอร์ติดต่อ" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </CardContent>
        </Card>
        <Card className="border">
          <CardHeader>
            <CardTitle>ที่อยู่จัดส่ง</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="ที่อยู่ทั้งหมด"
              value={addressText}
              onChange={(e) => setAddressText(e.target.value)}
            />
            <Button type="button" variant="outline" onClick={splitAddress}>
              แยกที่อยู่จากข้อความ
            </Button>
            <Input placeholder="ชื่อผู้รับ" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
            <Input placeholder="ที่อยู่" value={addressLine} onChange={(e) => setAddressLine(e.target.value)} />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="จังหวัด/อำเภอ" value={city} onChange={(e) => setCity(e.target.value)} />
              <Input placeholder="รหัสไปรษณีย์" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            </div>
          </CardContent>
        </Card>
        <OrderItemsRepeater items={items} onItemsChange={setItems} />
        <Button className="w-full" onClick={save}>บันทึกบิล</Button>
      </div>
    </div>
  )
}
