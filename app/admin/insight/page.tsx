"use client"

import { useEffect } from "react"
import Link from "next/link"
import PageWrapper from "@/components/admin/PageWrapper"
import { Button } from "@/components/ui/buttons/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { useBillStore } from "@/core/store"
import {
  OrdersTodayCard,
  ReadyToShipCard,
  UnpaidOrdersCard,
  RevenueSummaryCard,
} from "../analytics/cards"

export default function AdminInsightPage() {
  const store = useBillStore()
  useEffect(() => {
    store.refresh()
  }, [store])

  const latest = [...store.bills]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const total = (items: { price: number; quantity: number }[], shipping = 0) =>
    items.reduce((s, it) => s + it.price * it.quantity, 0) + shipping

  return (
    <PageWrapper title="Insight Dashboard" breadcrumb={[{ title: "Insight" }]}> 
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <OrdersTodayCard />
          <ReadyToShipCard />
          <UnpaidOrdersCard />
          <RevenueSummaryCard />
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">บิลล่าสุด</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ลูกค้า</TableHead>
                <TableHead className="text-right">ยอด</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead>สร้างเมื่อ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latest.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>{b.customer}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(total(b.items, b.shipping))}
                  </TableCell>
                  <TableCell>{b.status}</TableCell>
                  <TableCell>{new Date(b.createdAt).toLocaleDateString('th-TH')}</TableCell>
                </TableRow>
              ))}
              {latest.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-sm py-4">
                    ไม่มีข้อมูล
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>

        <div className="flex gap-2">
          <Link href="/admin/bill/create">
            <Button>สร้างบิล</Button>
          </Link>
          <Link href="/admin/inventory">
            <Button variant="outline">คลังสินค้า</Button>
          </Link>
          <Link href="/admin/bills">
            <Button variant="outline">ดูทั้งหมด</Button>
          </Link>
        </div>
      </div>
    </PageWrapper>
  )
}
