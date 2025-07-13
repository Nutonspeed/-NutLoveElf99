"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { loadQuotes, listQuotes, updateQuoteStatus } from '@/lib/mock-quotes'
import type { QuoteRequest, QuoteStatus } from '@/types/quote'

const statusOptions = [
  { value: 'new', label: 'ใหม่' },
  { value: 'reviewed', label: 'ตรวจสอบแล้ว' },
  { value: 'accepted', label: 'ยอมรับ' },
  { value: 'rejected', label: 'ปฏิเสธ' },
]

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])

  useEffect(() => {
    loadQuotes()
    setQuotes([...listQuotes()])
  }, [])

  const changeStatus = (id: string, status: QuoteStatus) => {
    updateQuoteStatus(id, status)
    setQuotes([...listQuotes()])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">คำขอใบเสนอราคา</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>รายการ ({quotes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>รายการ</TableHead>
                  <TableHead>วันที่</TableHead>
                  <TableHead>สถานะ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{q.customerName}</p>
                        <p className="text-sm text-gray-500">{q.customerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>{q.items.map((i) => i.productName).join(', ')}</TableCell>
                    <TableCell>{new Date(q.createdAt).toLocaleDateString('th-TH')}</TableCell>
                    <TableCell>
                      <Select value={q.status} onValueChange={(v) => changeStatus(q.id, v as QuoteStatus)}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="สถานะ" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {quotes.length === 0 && (
              <p className="text-center text-gray-500 py-8">ไม่มีรายการ</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
