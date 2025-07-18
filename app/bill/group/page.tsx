'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Input } from '@/components/ui/inputs/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { mockCustomers } from '@/lib/mock-customers'
import type { BillItem } from '@/mock/bills'
import { addBill } from '@/mock/bills'
import { toast } from 'sonner'

export default function BillGroupPage() {
  const [selected, setSelected] = useState<string[]>([])
  const [items, setItems] = useState<BillItem[]>([])
  const [customerFilter, setCustomerFilter] = useState('')
  const [shipping, setShipping] = useState(50)
  const [note, setNote] = useState('')

  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0)
  const total = subtotal + shipping

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    )
  }

  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }])
  }

  const updateItem = (i: number, field: keyof BillItem, value: string) => {
    setItems(items.map((it, idx) => (idx === i ? { ...it, [field]: value } : it)))
  }

  const removeItem = (i: number) => {
    setItems(items.filter((_, idx) => idx !== i))
  }

  const create = () => {
    if (items.length === 0 || selected.length === 0) {
      toast.error('ยังไม่สามารถสร้างบิลกลุ่มได้')
      return
    }
    selected.forEach((cid) => {
      const c = mockCustomers.find((cu) => cu.id === cid)
      if (!c) return
      addBill({ customer: c.name, items, shipping, note })
    })
    toast.success(`สร้างบิล ${selected.length} ใบแล้ว (mock)`)
    setItems([])
    setSelected([])
    setNote('')
    setShipping(50)
  }

  const filteredCustomers = mockCustomers.filter((c) =>
    c.name.toLowerCase().includes(customerFilter.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">สร้างบิลกลุ่ม</h1>
      <Card>
        <CardHeader>
          <CardTitle>เลือกลูกค้า</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input
            placeholder="ค้นหาชื่อลูกค้า"
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value)}
          />
          <div className="max-h-60 overflow-y-auto space-y-1">
            {filteredCustomers.map((c) => (
              <label key={c.id} className="flex items-center space-x-2">
                <Checkbox
                  checked={selected.includes(c.id)}
                  onCheckedChange={() => toggle(c.id)}
                />
                <span>{c.name}</span>
              </label>
            ))}
            {filteredCustomers.length === 0 && (
              <p className="text-sm text-gray-500 text-center">ไม่พบลูกค้า</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>รายการสินค้า</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {items.map((it, idx) => (
            <div key={idx} className="flex space-x-2 items-end">
              <Input
                placeholder="สินค้า"
                value={it.name}
                onChange={(e) => updateItem(idx, 'name', e.target.value)}
              />
              <Input
                type="number"
                className="w-20"
                value={it.quantity}
                onChange={(e) => updateItem(idx, 'quantity', e.target.value)}
              />
              <Input
                type="number"
                className="w-24"
                value={it.price}
                onChange={(e) => updateItem(idx, 'price', e.target.value)}
              />
              <Button type="button" variant="outline" size="icon" onClick={() => removeItem(idx)}>
                ×
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addItem}>
            เพิ่มสินค้า
          </Button>
          <div className="pt-2 border-t space-y-2">
            <div className="flex justify-between">
              <span>ยอดสินค้า</span>
              <span>฿{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2 justify-between">
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
          <Textarea
            placeholder="หมายเหตุ"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </CardContent>
      </Card>
      <Button onClick={create}>สร้างบิล (mock)</Button>
    </div>
  )
}
