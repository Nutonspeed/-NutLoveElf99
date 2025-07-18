"use client"
import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import { useCart } from '@/contexts/cart-context'
import { findDiscountCode } from '@/lib/mock-discount-codes'

export default function StoreCheckoutPage() {
  const { state, dispatch } = useCart()
  const [code, setCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const apply = () => {
    const c = findDiscountCode(code)
    if (!c) return
    setDiscount(c.type==='percent' ? state.total * (c.amount/100) : c.amount)
  }

  const total = state.total - discount

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <div className="space-x-2">
          <Input placeholder="รหัสส่วนลด" value={code} onChange={e=>setCode(e.target.value)} className="w-48 inline-block" />
          <Button onClick={apply}>ใช้</Button>
        </div>
        <p>ยอดรวม: ฿{total.toLocaleString()}</p>
        <Button onClick={()=>dispatch({type:'CLEAR_CART'})}>ยืนยันสั่งซื้อ (mock)</Button>
      </div>
    </div>
  )
}
