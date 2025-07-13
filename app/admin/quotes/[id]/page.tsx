"use client"
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getQuote, updateQuote } from '@/lib/mock-quotes'
import type { QuoteStatus } from '@/types/quote'

export default function AdminQuoteDetail({ params }: { params: { id: string } }) {
  const { id } = params
  const quote = getQuote(id)
  const router = useRouter()
  const [price, setPrice] = useState(quote?.estimatedTotal || '')
  const [note, setNote] = useState(quote?.note || '')

  if (!quote) {
    return <div className="min-h-screen flex items-center justify-center">ไม่พบใบเสนอราคา</div>
  }

  const save = () => {
    updateQuote(id, { estimatedTotal: Number(price), note, status: 'quoted' as QuoteStatus })
    router.push('/admin/quotes')
  }

  const reject = () => {
    updateQuote(id, { status: 'rejected' as QuoteStatus })
    router.push('/admin/quotes')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-2">
          <Link href="/admin/quotes">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ใบเสนอราคา {quote.id}</h1>
        </div>
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>ประเมินราคา</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="number"
              placeholder="ราคาโดยประมาณ"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Textarea
              placeholder="หมายเหตุ"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="flex space-x-2">
              <Button onClick={save}>บันทึก</Button>
              <Button variant="outline" onClick={reject}>ปฏิเสธ</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
