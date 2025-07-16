"use client"
import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Input } from '@/components/ui/inputs/input'
import { Label } from '@/components/ui/label'
import { OrderItemsRepeater } from '@/components/OrderItemsRepeater'
import type { OrderItem } from '@/types/order'
import { addQuote } from '@/lib/mock-quotes'

export default function QuoteFromOrderPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [items, setItems] = useState<OrderItem[]>([])
  const [sent, setSent] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const raw = sessionStorage.getItem('quoteFromOrder')
    if (!raw) return
    try {
      const order = JSON.parse(raw)
      setName(order.customerName)
      setEmail(order.customerEmail)
      setPhone(order.shippingAddress?.phone || '')
      setItems(
        order.items.map((i: any) => ({
          id: i.productId,
          productName: i.productName,
          quantity: i.quantity,
          price: i.price,
          size: i.size,
          color: i.color,
        }))
      )
      setReady(true)
    } catch {
      // ignore
    }
  }, [])

  const submit = () => {
    if (sent) return
    addQuote({
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      items: items.map((i) => ({
        productId: i.id,
        productName: i.productName,
        quantity: i.quantity,
        price: i.price,
        size: i.size,
        color: i.color,
      })),
    })
    setSent(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>ขอใบเสนอราคา</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!ready ? (
              <p className="text-center text-red-600">
                ยังไม่สามารถสร้างใบเสนอราคาได้
                <br />
                <a href="/orders" className="underline">กลับไปที่ออเดอร์</a>
              </p>
            ) : !sent ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">ชื่อ</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">อีเมล</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone">โทรศัพท์</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </div>
                <OrderItemsRepeater items={items} onItemsChange={setItems} />
                <Button className="w-full" onClick={submit}>ส่งคำขอ</Button>
              </>
            ) : (
              <p className="text-center text-green-600">บันทึกคำขอเรียบร้อย</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
