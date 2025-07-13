"use client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { listAllSupply, type SupplyItem } from "@/lib/mock-supply"
import { getMockNow } from "@/lib/mock-date"

export default function SupplyTrackerPage() {
  const items = listAllSupply()
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/dashboard">\
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ติดตามวัตถุดิบ</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>รายการวัตถุดิบ</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>ชื่อ</TableHead>
                  <TableHead>จำนวน</TableHead>
                  <TableHead>ETA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((i: SupplyItem) => {
                  const overdue = new Date(i.eta) < getMockNow()
                  return (
                    <TableRow key={i.id} className={overdue ? "bg-red-100" : ""}>
                      <TableCell>{i.orderId}</TableCell>
                      <TableCell>{i.item}</TableCell>
                      <TableCell>{i.quantity}</TableCell>
                      <TableCell>{new Date(i.eta).toLocaleString("th-TH")}</TableCell>
                    </TableRow>
                  )
                })}
                {items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-sm text-gray-500">
                      ไม่มีข้อมูล
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
