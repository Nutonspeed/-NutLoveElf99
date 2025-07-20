"use client"

import Link from 'next/link'
import { useMemo } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { mockOrders } from '@/lib/mock-orders'
import { groupByDay, groupByMonth } from '@/lib/aggregateReports'
import { formatCurrency } from '@/lib/utils'

export default function AdminReportsPage() {
  const daily = useMemo(() => groupByDay(mockOrders), [])
  const monthly = useMemo(() => groupByMonth(mockOrders), [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/menu">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">สรุปรายวัน / รายเดือน</h1>
            <p className="text-gray-600">ดูยอดขายรวมแบบรายวันและรายเดือน (mock)</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>ยอดขายรายวัน</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>วันที่</TableHead>
                    <TableHead className="text-right">ยอดขาย</TableHead>
                    <TableHead className="text-right">ออเดอร์</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {daily.map(d => (
                    <TableRow key={d.date}>
                      <TableCell>{d.date}</TableCell>
                      <TableCell className="text-right">{formatCurrency(d.total)}</TableCell>
                      <TableCell className="text-right">{d.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>ยอดขายรายเดือน</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>เดือน</TableHead>
                    <TableHead className="text-right">ยอดขาย</TableHead>
                    <TableHead className="text-right">ออเดอร์</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthly.map(m => (
                    <TableRow key={m.date}>
                      <TableCell>{m.date}</TableCell>
                      <TableCell className="text-right">{formatCurrency(m.total)}</TableCell>
                      <TableCell className="text-right">{m.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
