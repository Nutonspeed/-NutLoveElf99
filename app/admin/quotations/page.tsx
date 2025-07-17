"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { loadQuotations, listQuotations } from '@/lib/mock-quotations'
import type { Quotation } from '@/types/quotation'

export default function AdminQuotationsPage() {
  const [quotes, setQuotes] = useState<Quotation[]>([])

  useEffect(() => {
    loadQuotations()
    setQuotes([...listQuotations()])
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ประวัติใบเสนอราคา</h1>
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
                  <TableHead>จำนวนรายการ</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="w-24" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell>{q.customer}</TableCell>
                    <TableCell>{q.items.length}</TableCell>
                    <TableCell>{q.status}</TableCell>
                    <TableCell>
                      <Link href={`/quote/mock-${q.id}`} className="underline text-sm">
                        เปิด
                      </Link>
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
