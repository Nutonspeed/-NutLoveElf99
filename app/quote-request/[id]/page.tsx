"use client"
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { getQuote } from '@/lib/mock-quotes'
import { useCart } from '@/contexts/cart-context'

export default function QuoteRequestPage({ params }: { params: { id: string } }) {
  const { id } = params
  const quote = getQuote(id)
  const { dispatch } = useCart()
  const router = useRouter()

  const confirm = () => {
    if (!quote) return
    quote.items.forEach((item) => {
      dispatch({ type: 'ADD_ITEM', payload: item })
    })
    router.push('/cart')
  }

  if (!quote) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        ไม่พบใบเสนอราคา
      </div>
    )
  }

  const statusText =
    quote.status === 'pending'
      ? 'รอประเมิน'
      : quote.status === 'quoted'
        ? 'เสนอราคาแล้ว'
        : 'ปฏิเสธ'

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>ใบเสนอราคา {quote.id}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>สถานะ: {statusText}</p>
            {quote.estimatedTotal && (
              <p>ราคาโดยประมาณ: ฿{quote.estimatedTotal.toLocaleString()}</p>
            )}
            {quote.note && <p>หมายเหตุ: {quote.note}</p>}
            {quote.status === 'quoted' && (
              <Button onClick={confirm} className="w-full">
                ยืนยันสั่งซื้อ
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
