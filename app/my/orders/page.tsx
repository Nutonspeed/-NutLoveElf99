"use client"
import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Button } from '@/components/ui/buttons/button'
import Link from 'next/link'

interface BillDetail {
  id: string
  customer: { name: string; phone?: string; email?: string }
  items: { name: string; quantity: number; price: number }[]
  shipping: number
  discount?: number
  note?: string
}

export default function MyOrdersPage() {
  const [query, setQuery] = useState('')
  const [list, setList] = useState<BillDetail[]>([])
  const [searched, setSearched] = useState(false)

  const search = async () => {
    const res = await fetch('/mock/bill.detail.json')
    const data: BillDetail[] = await res.json()
    const result = data.filter(b => b.customer.phone === query || b.customer.email === query)
    setList(result)
    setSearched(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 space-y-4">
        <h1 className="text-3xl font-bold text-center mb-4">ค้นหาคำสั่งซื้อของคุณ</h1>
        <div className="flex justify-center gap-2">
          <input
            className="border rounded p-2 w-64"
            placeholder="เบอร์โทรหรืออีเมล"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <Button onClick={search}>ค้นหา</Button>
        </div>
        {searched && list.length === 0 && (
          <p className="text-center text-sm text-gray-500">ไม่พบคำสั่งซื้อ</p>
        )}
        {list.map(order => (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle>คำสั่งซื้อ {order.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">{order.customer.name}</p>
              <p className="text-sm text-gray-600">ยอดรวม {order.items.reduce((t,i)=>t+i.price*i.quantity,0)+order.shipping-(order.discount||0)} บาท</p>
              <div className="flex gap-2">
                <Link href={`/receipt/${order.id}`}><Button variant="outline" size="sm">ใบเสร็จ</Button></Link>
                <Link href={`/order-track/${order.id}`}><Button variant="outline" size="sm">ติดตาม</Button></Link>
                <Link href={`/review/${order.id}`}><Button variant="outline" size="sm">รีวิว</Button></Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Footer />
    </div>
  )
}
