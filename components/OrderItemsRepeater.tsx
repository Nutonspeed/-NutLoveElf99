// @ts-nocheck
"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Upload, Trash2 } from "lucide-react"
import type { OrderItem } from "@/types/order"

interface OrderItemsRepeaterProps {
  items: OrderItem[]
  onItemsChange: (items: OrderItem[]) => void
}

const sofaSizes = [
  { value: "S (90-140 cm)", label: "S (90-140 cm) - 1 ที่นั่ง" },
  { value: "M (145-185 cm)", label: "M (145-185 cm) - 2 ที่นั่ง" },
  { value: "L (190-230 cm)", label: "L (190-230 cm) - 3 ที่นั่ง" },
  { value: "XL (235-300 cm)", label: "XL (235-300 cm) - 4+ ที่นั่ง" },
]

const patterns = [
  "ลายดอกไม้",
  "ลายทาง",
  "ลายจุด",
  "ลายตาราง",
  "ลายใบไม้",
  "ลายเรขาคณิต",
  "ลายวินเทจ",
  "ลายโมเดิร์น",
  "สีพื้น",
  "อื่นๆ",
]

const colors = [
  "สีขาว",
  "สีดำ",
  "สีเทา",
  "สีน้ำตาล",
  "สีครีม",
  "สีเบจ",
  "สีแดง",
  "สีฟ้า",
  "สีเขียว",
  "สีเหลือง",
  "สีชมพู",
  "สีม่วง",
  "อื่นๆ",
]

export function OrderItemsRepeater({ items, onItemsChange }: OrderItemsRepeaterProps) {
  const [newItem, setNewItem] = useState<Partial<OrderItem>>({
    productName: "ผ้าคลุมโซฟา",
    size: "",
    pattern: "",
    color: "",
    price: 0,
    quantity: 1,
    discount: 0,
    notes: "",
    image: "",
  })

  const addItem = () => {
    if (!newItem.size || !newItem.pattern || !newItem.color || !newItem.price) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน")
      return
    }

    const item: OrderItem = {
      id: `item-${Date.now()}`,
      productName: newItem.productName || "ผ้าคลุมโซฟา",
      size: newItem.size || "",
      pattern: newItem.pattern || "",
      color: newItem.color || "",
      price: newItem.price || 0,
      quantity: newItem.quantity || 1,
      discount: newItem.discount || 0,
      notes: newItem.notes || "",
      image: newItem.image || "/placeholder.svg?height=100&width=100&text=Sofa+Cover",
    }

    onItemsChange([...items, item])

    setNewItem({
      productName: "ผ้าคลุมโซฟา",
      size: "",
      pattern: "",
      color: "",
      price: 0,
      quantity: 1,
      discount: 0,
      notes: "",
      image: "",
    })
  }

  const removeItem = (id: string) => {
    onItemsChange(items.filter((item) => item.id !== id))
  }

  const updateItem = (id: string, updates: Partial<OrderItem>) => {
    onItemsChange(items.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setNewItem({ ...newItem, image: imageUrl })
    }
  }

  return (
    <div className="space-y-6">
      {items.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">รายการสินค้า ({items.length})</h3>
          {items.map((item, index) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {item.image && (
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{item.productName}</h4>
                        <Badge variant="outline">#{index + 1}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">ขนาด:</span> {item.size}
                        </div>
                        <div>
                          <span className="text-gray-500">ลาย:</span> {item.pattern}
                        </div>
                        <div>
                          <span className="text-gray-500">สี:</span> {item.color}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div>
                          <Label htmlFor={`quantity-${item.id}`} className="text-xs">
                            จำนวน
                          </Label>
                          <Input
                            id={`quantity-${item.id}`}
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, { quantity: Number.parseInt(e.target.value) || 1 })}
                            className="w-20 h-8"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`price-${item.id}`} className="text-xs">
                            ราคา/ชิ้น
                          </Label>
                          <Input
                            id={`price-${item.id}`}
                            type="number"
                            min="0"
                            value={item.price}
                            onChange={(e) => updateItem(item.id, { price: Number.parseFloat(e.target.value) || 0 })}
                            className="w-24 h-8"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`discount-${item.id}`} className="text-xs">
                            ส่วนลด (%)
                          </Label>
                          <Input
                            id={`discount-${item.id}`}
                            type="number"
                            min="0"
                            max="100"
                            value={item.discount ?? 0}
                            onChange={(e) =>
                              updateItem(item.id, {
                                discount: Number.parseFloat(e.target.value) || 0,
                              })
                            }
                            className="w-24 h-8"
                          />
                        </div>
                        <div className="flex items-end">
                          <div className="text-right">
                            <div className="text-xs text-gray-500">รวมหลังส่วนลด</div>
                            <div className="font-semibold">
                              ฿{(item.price * item.quantity * (1 - (item.discount ?? 0) / 100)).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      {item.notes && (
                        <div className="text-sm">
                          <span className="text-gray-500">หมายเหตุ:</span> {item.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            เพิ่มสินค้าใหม่
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="productName">ชื่อสินค้า</Label>
              <Input
                id="productName"
                value={newItem.productName}
                onChange={(e) => setNewItem({ ...newItem, productName: e.target.value })}
                placeholder="ผ้าคลุมโซฟา"
              />
            </div>
            <div>
              <Label htmlFor="size">ขนาด</Label>
              <Select value={newItem.size} onValueChange={(value) => setNewItem({ ...newItem, size: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกขนาด" />
                </SelectTrigger>
                <SelectContent>
                  {sofaSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pattern">ลายผ้า</Label>
              <Select value={newItem.pattern} onValueChange={(value) => setNewItem({ ...newItem, pattern: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกลายผ้า" />
                </SelectTrigger>
                <SelectContent>
                  {patterns.map((pattern) => (
                    <SelectItem key={pattern} value={pattern}>
                      {pattern}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="color">สี</Label>
              <Select value={newItem.color} onValueChange={(value) => setNewItem({ ...newItem, color: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสี" />
                </SelectTrigger>
                <SelectContent>
                  {colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="quantity">จำนวน</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: Number.parseInt(e.target.value) || 1 })}
              />
            </div>
            <div>
              <Label htmlFor="price">ราคา/ชิ้น (บาท)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: Number.parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="discount">ส่วนลด (%)</Label>
              <Input
                id="discount"
                type="number"
                min="0"
                max="100"
                value={newItem.discount}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    discount: Number.parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="flex items-end">
              <div className="w-full">
                <Label className="text-sm text-gray-500">รวม</Label>
                <div className="h-10 flex items-center font-semibold text-lg">
                  ฿{
                    ((newItem.price || 0) *
                      (newItem.quantity || 1) *
                      (1 - (newItem.discount || 0) / 100)
                    ).toLocaleString()
                  }
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">หมายเหตุ (ไม่บังคับ)</Label>
            <Textarea
              id="notes"
              value={newItem.notes}
              onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
              placeholder="ระบุรายละเอียดเพิ่มเติม เช่น สีที่ต้องการ, ความต้องการพิเศษ"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="image">รูปภาพสินค้า (ไม่บังคับ)</Label>
            <div className="flex items-center space-x-2">
              <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="flex-1" />
              <Button type="button" variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            {newItem.image && (
              <div className="mt-2">
                <img
                  src={newItem.image || "/placeholder.svg"}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <Button onClick={addItem} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            เพิ่มสินค้า
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

