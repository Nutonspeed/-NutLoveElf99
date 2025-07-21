"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, PrinterIcon as Print, Download } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockOrders } from "@/lib/mock-orders"
import { exportPdf } from "@/lib/exportPdf"

export default function PrintSummaryPage() {
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    if (typeof window === "undefined") return
    const el = document.getElementById("summary") as HTMLElement
    setLoading(true)
    try {
      await exportPdf(el, "summary.pdf")
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="print:hidden bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/reports">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">สรุปออเดอร์</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePrint}>
              <Print className="mr-2 h-4 w-4" /> พิมพ์
            </Button>
            <Button onClick={handleExport} disabled={loading}>
              <Download className="mr-2 h-4 w-4" /> บันทึกเป็น PDF
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 print:p-0" id="summary">
        <Card className="max-w-4xl mx-auto print:shadow-none print:border-none">
          <CardHeader>
            <CardTitle>สรุปยอดขาย (mock)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เลขที่</TableHead>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead className="text-right">ยอดรวม</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.slice(0, 5).map((o) => (
                  <TableRow key={o.id}>
                    <TableCell>{o.id}</TableCell>
                    <TableCell>{o.customerName}</TableCell>
                    <TableCell className="text-right">฿{o.total.toLocaleString()}</TableCell>
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
