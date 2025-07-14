"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/label"
import type { OrderItem } from "@/types/order"

interface OrderSummaryProps {
  items: OrderItem[]
  discount: number
  shippingCost: number
  tax: number
  onDiscountChange: (discount: number) => void
  onShippingCostChange: (shippingCost: number) => void
  onTaxChange: (tax: number) => void
}

export function OrderSummary({
  items,
  discount,
  shippingCost,
  tax,
  onDiscountChange,
  onShippingCostChange,
  onTaxChange,
}: OrderSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal - discount + shippingCost + tax

  return (
    <Card>
      <CardHeader>
        <CardTitle>สรุปยอดรวม</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>ยอดรวมสินค้า:</span>
            <span>฿{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <Label htmlFor="discount">ส่วนลด:</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="discount"
                type="number"
                min="0"
                max={subtotal}
                value={discount}
                onChange={(e) => onDiscountChange(Number.parseFloat(e.target.value) || 0)}
                className="w-24 text-right"
              />
              <span>บาท</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Label htmlFor="shipping">ค่าจัดส่ง:</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="shipping"
                type="number"
                min="0"
                value={shippingCost}
                onChange={(e) => onShippingCostChange(Number.parseFloat(e.target.value) || 0)}
                className="w-24 text-right"
              />
              <span>บาท</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Label htmlFor="tax">ภาษี/ค่าธรรมเนียม:</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="tax"
                type="number"
                min="0"
                value={tax}
                onChange={(e) => onTaxChange(Number.parseFloat(e.target.value) || 0)}
                className="w-24 text-right"
              />
              <span>บาท</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>ยอดรวมทั้งสิ้น:</span>
            <span className="text-2xl text-primary">฿{total.toLocaleString()}</span>
          </div>
        </div>

        <div className="text-sm text-gray-500 space-y-1">
          <div className="flex justify-between">
            <span>จำนวนรายการ:</span>
            <span>{items.length} รายการ</span>
          </div>
          <div className="flex justify-between">
            <span>จำนวนชิ้นรวม:</span>
            <span>{items.reduce((sum, item) => sum + item.quantity, 0)} ชิ้น</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
