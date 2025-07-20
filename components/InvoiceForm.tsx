"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/buttons/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export interface InvoiceItem {
  id: string
  name: string
  quantity: number
  price: number
  freebie?: boolean
  note?: string
}

interface InvoiceFormProps {
  onSubmit?: (items: InvoiceItem[]) => void
}

export default function InvoiceForm({ onSubmit }: InvoiceFormProps) {
  const [items, setItems] = useState<InvoiceItem[]>([])
  const [newItem, setNewItem] = useState<Omit<InvoiceItem, "id">>({
    name: "",
    quantity: 1,
    price: 0,
    freebie: false,
    note: "",
  })

  const addItem = () => {
    if (!newItem.name) return
    const item: InvoiceItem = {
      id: Date.now().toString(),
      ...newItem,
      price: newItem.freebie ? 0 : newItem.price,
    }
    setItems([...items, item])
    setNewItem({ name: "", quantity: 1, price: 0, freebie: false, note: "" })
  }

  const updateItem = (id: string, updates: Partial<InvoiceItem>) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const total = items.reduce(
    (sum, item) => sum + (item.freebie ? 0 : item.price * item.quantity),
    0,
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(items)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>รายการสินค้า</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-start justify-between">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <Input
                      value={item.name}
                      onChange={(e) => updateItem(item.id, { name: e.target.value })}
                      className="flex-1"
                    />
                    <Checkbox
                      checked={item.freebie}
                      onCheckedChange={(v) =>
                        updateItem(item.id, {
                          freebie: Boolean(v),
                          price: v ? 0 : item.price,
                        })
                      }
                    />
                  </div>
                  <Textarea
                    value={item.note}
                    onChange={(e) => updateItem(item.id, { note: e.target.value })}
                    rows={2}
                    placeholder="หมายเหตุ"
                  />
                </div>
                <div className="flex items-end space-x-2">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(item.id, { quantity: Number.parseInt(e.target.value) || 1 })
                    }
                    className="w-20"
                  />
                  <Input
                    type="number"
                    min="0"
                    value={item.price}
                    disabled={item.freebie}
                    onChange={(e) =>
                      updateItem(item.id, { price: Number.parseFloat(e.target.value) || 0 })
                    }
                    className="w-24"
                  />
                  <Button type="button" variant="outline" size="icon" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="text-right font-semibold">รวม: ฿{total.toLocaleString()}</div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" /> เพิ่มสินค้า
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">ชื่อสินค้า</Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="ระบุชื่อสินค้า"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">จำนวน</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem({ ...newItem, quantity: Number.parseInt(e.target.value) || 1 })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="price">ราคา/หน่วย</Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: Number.parseFloat(e.target.value) || 0 })
                }
                disabled={newItem.freebie}
              />
            </div>
            <div className="flex items-center space-x-2 pt-4">
              <Checkbox
                id="freebie"
                checked={newItem.freebie}
                onCheckedChange={(v) =>
                  setNewItem({ ...newItem, freebie: Boolean(v), price: v ? 0 : newItem.price })
                }
              />
              <Label htmlFor="freebie" className="text-sm">
                ของแถม
              </Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="note">หมายเหตุ</Label>
            <Textarea
              id="note"
              value={newItem.note}
              onChange={(e) => setNewItem({ ...newItem, note: e.target.value })}
              rows={2}
            />
          </div>
          <Button type="button" onClick={addItem} className="w-full">
            <Plus className="h-4 w-4 mr-2" /> เพิ่มรายการ
          </Button>
        </CardContent>
      </Card>
      <div className="text-right">
        <Button type="submit">บันทึกบิล</Button>
      </div>
    </form>
  )
}

