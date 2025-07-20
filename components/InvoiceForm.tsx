"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/buttons/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OrderItemsRepeater } from "@/components/OrderItemsRepeater"
import { mockCustomers, addCustomer, type Customer } from "@/lib/mock-customers"
import type { OrderItem } from "@/types/order"

interface InvoiceFormProps {
  onSave: (data: { customer: Customer; items: OrderItem[] }) => void
}

export default function InvoiceForm({ onSave }: InvoiceFormProps) {
  const [selectedCustomer, setSelectedCustomer] = useState("new")
  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [items, setItems] = useState<OrderItem[]>([])

  useEffect(() => {
    if (selectedCustomer === "new") {
      setCustomerName("")
      setPhone("")
      setAddress("")
      return
    }
    const c = mockCustomers.find((cu) => cu.id === selectedCustomer)
    if (c) {
      setCustomerName(c.name)
      setPhone(c.phone ?? "")
      const addr = [c.address, c.city, c.postalCode]
        .filter(Boolean)
        .join(" ")
      setAddress(addr)
    }
  }, [selectedCustomer])

  const handleSave = () => {
    let customer: Customer | undefined
    if (selectedCustomer === "new") {
      customer = addCustomer({ name: customerName, phone, address })
    } else {
      customer = mockCustomers.find((c) => c.id === selectedCustomer)
    }
    if (!customer) return
    onSave({ customer, items })
  }

  return (
    <div className="space-y-6">
      <Card className="border">
        <CardHeader>
          <CardTitle>ข้อมูลลูกค้า</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={selectedCustomer}
            onValueChange={(v) => setSelectedCustomer(v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="เลือกลูกค้า" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">ลูกค้าใหม่</SelectItem>
              {mockCustomers.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                  {c.phone ? ` (${c.phone})` : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="ชื่อลูกค้า"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <Input
            placeholder="เบอร์ติดต่อ"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Textarea
            placeholder="ที่อยู่"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </CardContent>
      </Card>
      <OrderItemsRepeater items={items} onItemsChange={setItems} />
      <Button className="w-full" onClick={handleSave}>
        บันทึกบิล
      </Button>
    </div>
  )
}
