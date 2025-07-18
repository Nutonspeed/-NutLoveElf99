"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/cards/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getDailySales } from "@/lib/mock/orders"

export default function AdminReportsPage() {
  const [daily, setDaily] = useState<{ date: string; total: number }[]>([])

  useEffect(() => {
    const today = new Date()
    const past = new Date()
    past.setDate(today.getDate() - 6)
    setDaily(getDailySales(past, today))
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
          <h1 className="text-3xl font-bold">รายงานสรุป (mock)</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ยอดขาย 7 วันล่าสุด</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>วันที่</TableHead>
                  <TableHead className="text-right">ยอดขาย</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {daily.map((d) => (
                  <TableRow key={d.date}>
                    <TableCell>{d.date}</TableCell>
                    <TableCell className="text-right">{d.total.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {daily.length === 0 && (
              <p className="text-center py-8 text-gray-500">ไม่มีข้อมูล</p>
            )}
          </CardContent>
        </Card>
        <Link href="/admin/reports/sales">
          <Button>ดูรายงานยอดขายแบบละเอียด</Button>
        </Link>
      </div>
    </div>
  )
}
