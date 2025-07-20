"use client"

import { useState } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { AdminFabric } from "@/mock/fabrics"
import { adminFabrics } from "@/mock/fabrics"

interface BillItem {
  fabricId: string
  name: string
  code: string
  quantity: number
  price: number
}

interface InvoiceFormProps {
  onSave?: (data: { customer: string; items: BillItem[]; shipping: number; note: string }) => void
}

export default function InvoiceForm({ onSave }: InvoiceFormProps) {
  const [customer, setCustomer] = useState("")
  const [items, setItems] = useState<BillItem[]>([])
  const [shipping, setShipping] = useState(50)
  const [note, setNote] = useState("")

  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0)
  const total = subtotal + shipping

  const addItem = () =>
    setItems([...items, { fabricId: "", name: "", code: "", quantity: 1, price: 0 }])

  const updateItem = (idx: number, updates: Partial<BillItem>) => {
    setItems(items.map((it, i) => (i === idx ? { ...it, ...updates } : it)))
  }

  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave?.({ customer, items, shipping, note })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="ชื่อลูกค้า" value={customer} onChange={(e) => setCustomer(e.target.value)} />
      <Textarea placeholder="หมายเหตุ" value={note} onChange={(e) => setNote(e.target.value)} />
      <div className="space-y-2">
        {items.map((it, idx) => (
          <div key={idx} className="flex space-x-2 items-end">
            <div className="flex-1 space-y-1">
              <Select
                value={it.fabricId}
                onValueChange={(v) => {
                  const f: AdminFabric | undefined = adminFabrics.find((af) => af.id === v)
                  updateItem(idx, { fabricId: v, name: f?.name || "", code: f?.code || "" })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกผ้า" />
                </SelectTrigger>
                <SelectContent>
                  {adminFabrics.map((f) => (
                    <SelectItem key={f.id} value={f.id}>
                      {f.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {it.code && (
                <span className="text-xs text-muted-foreground">
                  {it.name} ({it.code})
                </span>
              )}
            </div>
            <Input
              type="number"
              className="w-20"
              value={it.quantity}
              onChange={(e) =>
                updateItem(idx, { quantity: parseInt(e.target.value, 10) || 1 })
              }
            />
            <Input
              type="number"
              className="w-24"
              value={it.price}
              onChange={(e) => updateItem(idx, { price: parseFloat(e.target.value) || 0 })}
            />
            <Button type="button" variant="outline" size="icon" onClick={() => removeItem(idx)}>
              ×
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addItem}>
          เพิ่มสินค้า
        </Button>
      </div>
      <div className="space-y-2 pt-2 border-t">
        <div className="flex justify-between">
          <span>ยอดสินค้า</span>
          <span>฿{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>ค่าจัดส่ง</span>
          <Input
            type="number"
            className="w-24"
            value={shipping}
            onChange={(e) => setShipping(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="flex justify-between font-semibold">
          <span>ยอดรวม</span>
          <span>฿{total.toLocaleString()}</span>
        </div>
      </div>
      <Button type="submit">บันทึกบิล</Button>
    </form>
  )
}
