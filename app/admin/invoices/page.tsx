"use client"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockOrders } from "@/lib/mock-orders"

export default function AdminInvoicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold">รายการบิล</h1>
        <Card>
          <CardHeader>
            <CardTitle>คำสั่งซื้อทั้งหมด (mock)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เลขที่</TableHead>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead className="text-right">ยอดรวม</TableHead>
                  <TableHead className="w-32" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell>{o.id}</TableCell>
                    <TableCell>{o.customerName}</TableCell>
                    <TableCell className="text-right">฿{o.total.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/invoices/${o.id}/print`} target="_blank">พิมพ์บิล</Link>
                      </Button>
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
