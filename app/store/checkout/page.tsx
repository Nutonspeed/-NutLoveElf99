"use client"
import { useEffect, useState } from "react"
import { getConfig } from "@/core/mock/store"

export default function StoreCheckoutPage() {
  const [subtotal] = useState(1000)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const cfg = getConfig().tax
    const taxAmount = Math.round(subtotal * (cfg.rate / 100))
    console.log("apply tax", cfg)
    setTax(cfg.included ? 0 : taxAmount)
    setTotal(cfg.included ? subtotal : subtotal + taxAmount)
  }, [subtotal])

  return (
    <div className="container mx-auto py-8 space-y-2">
      <h1 className="text-2xl font-bold">Store Checkout</h1>
      <p>ยอดก่อนภาษี: ฿{subtotal.toLocaleString()}</p>
      <p>ภาษี: ฿{tax.toLocaleString()}</p>
      <p className="font-bold">ยอดชำระ: ฿{total.toLocaleString()}</p>
    </div>
  )
}
