"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatCurrency } from '@/lib/utils'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

interface TopProduct {
  name: string
  quantity: number
  count: number
  subtotal: number
  billIds: string[]
}

export default function TopProductsPage() {
  const [range, setRange] = useState<'day' | 'month' | 'all'>('all')
  const [data, setData] = useState<TopProduct[]>([])

  useEffect(() => {
    fetch(`/api/admin/top-products?range=${range}`)
      .then(r => r.json())
      .then(setData)
  }, [range])

  const chartData = data.slice(0, 5).map(p => ({ name: p.name, total: p.subtotal }))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/reports">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">สินค้าขายดี</h1>
          <Select value={range} onValueChange={v => setRange(v as 'day' | 'month' | 'all')}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">รายวัน</SelectItem>
              <SelectItem value="month">รายเดือน</SelectItem>
              <SelectItem value="all">ทั้งหมด</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {chartData.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        )}
        <Card>
          <CardHeader>
            <CardTitle>รายการสินค้า</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>สินค้า</TableHead>
                  <TableHead className="text-right">จำนวนครั้ง</TableHead>
                  <TableHead className="text-right">ยอดรวม</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map(p => (
                  <TableRow key={p.name}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell className="text-right">{p.count}</TableCell>
                    <TableCell className="text-right">{formatCurrency(p.subtotal)}</TableCell>
                    <TableCell>
                      <Link href={`/admin/bills?product=${encodeURIComponent(p.name)}`}>
                        <Button variant="outline" size="sm">ดูบิล</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
