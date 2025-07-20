"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockOrders } from "@/lib/mock-orders"

export default function AdminInvoicesPage() {
  const [orders, setOrders] = useState(mockOrders)

  useEffect(() => {
    // mock fetch refresh
    setOrders([...mockOrders])
  }, [])

  const handlePrint = (id: string) => {
    const w = window.open(`/admin/invoice/${id}`, "_blank")
    if (w) {
      w.addEventListener("load", () => w.print())
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">บิลย้อนหลัง</h1>
      <Card>
        <CardHeader>
          <CardTitle>รายการบิล</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>เลขที่</TableHead>
                <TableHead>ลูกค้า</TableHead>
                <TableHead>วันที่</TableHead>
                <TableHead>ยอดรวม</TableHead>
                <TableHead className="text-right">การจัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString("th-TH")}</TableCell>
                  <TableCell>฿{order.total.toLocaleString()}</TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button variant="outline" size="sm" onClick={() => handlePrint(order.id)}>
                      พิมพ์
                    </Button>
                    <Link href={`/admin/invoice/${order.id}`} target="_blank">
                      <Button variant="outline" size="sm">รายละเอียด</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
