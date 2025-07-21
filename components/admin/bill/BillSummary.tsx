"use client"
import type { OrderItem } from "@/types/order"
import { formatCurrencyTHB } from "@/lib/format/currency"

export function getSubtotal(items: OrderItem[]): number {
  return items.reduce((sum, it) => sum + it.price * it.quantity, 0)
}

export function applyDiscount(subtotal: number, discount: number): number {
  return subtotal - discount
}

export function calculateTotal(
  items: OrderItem[],
  shipping: number,
  discount: number,
): number {
  return applyDiscount(getSubtotal(items), discount) + shipping
}

interface BillSummaryProps {
  items: OrderItem[]
  discount: number
  shipping: number
}

export default function BillSummary({
  items,
  discount,
  shipping,
}: BillSummaryProps) {
  const subtotal = getSubtotal(items)
  const total = calculateTotal(items, shipping, discount)
  return (
    <div className="bg-white rounded border text-sm divide-y">
      <div className="flex justify-between p-2">
        <span>รายการ</span>
        <span>{formatCurrencyTHB(subtotal)}</span>
      </div>
      <div className="flex justify-between p-2">
        <span>ค่าจัดส่ง</span>
        <span>{formatCurrencyTHB(shipping)}</span>
      </div>
      <div className="flex justify-between p-2">
        <span>ส่วนลด</span>
        <span>-{formatCurrencyTHB(discount)}</span>
      </div>
      <div className="flex justify-between p-2 font-semibold">
        <span>รวมทั้งหมด</span>
        <span>{formatCurrencyTHB(total)}</span>
      </div>
    </div>
  )
}
