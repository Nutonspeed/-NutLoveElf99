"use client"
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Input } from '@/components/ui/inputs/input'
import { OrderItemsRepeater } from '@/components/OrderItemsRepeater'
import type { OrderItem } from '@/types/order'
import { createQuotation } from '@/lib/mock-quotations'
import QuotePreview from '@/components/QuotePreview'
import { SendQuoteModal } from '@/components/admin/SendQuoteModal'

export default function AdminQuotationNewPage() {
  const [customer, setCustomer] = useState('')
  const [items, setItems] = useState<OrderItem[]>([])
  const [quoteId, setQuoteId] = useState<string | null>(null)
  const [showSend, setShowSend] = useState(false)

  const total = items.reduce((s, it) => s + it.price * it.quantity, 0)

  const create = () => {
    if (items.length === 0) {
      alert('ต้องมีสินค้าอย่างน้อย 1 รายการ')
      return
    }
    const q = createQuotation({
      customer,
      items: items.map((it) => ({
        name: it.productName,
        quantity: it.quantity,
        price: it.price,
      })),
    })
    setQuoteId(q.id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">สร้างใบเสนอราคา</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Input
              placeholder="ชื่อลูกค้า"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
            <OrderItemsRepeater items={items} onItemsChange={setItems} />
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>ยอดรวม</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>รวม: ฿{total.toLocaleString()}</p>
                <Button className="w-full" onClick={create}>บันทึกใบเสนอราคา</Button>
                {quoteId && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowSend(true)}
                    >
                      ส่งเข้าแชท (mock)
                    </Button>
                    <Link href={`/quote/mock-${quoteId}`} className="underline block text-center mt-2">
                      ดูใบเสนอราคา
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        {quoteId && <QuotePreview quotation={{ id: quoteId, customer, items: items.map(it => ({ name: it.productName, quantity: it.quantity, price: it.price })), status: 'sent', createdAt: new Date().toISOString() }} />}
      </div>
      {showSend && quoteId && (
        <SendQuoteModal quoteId={quoteId} onClose={() => setShowSend(false)} />
      )}
    </div>
  )
}
