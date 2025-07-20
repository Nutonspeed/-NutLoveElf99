"use client"
import Link from "next/link"
import { ArrowLeft, PrinterIcon as Print, Download, Copy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/cards/card"
import { Button } from "@/components/ui/buttons/button"
import BillPreview from "@/components/BillPreview"
import { mockBills } from "@/mock/bills"
import { mockOrders } from "@/lib/mock-orders"
import { downloadPDF } from "@/lib/mock-export"

export default function AdminBillPrintPage({ params }: { params: { id: string } }) {
  const bill = mockBills.find(b => b.id === params.id)
  const order = bill ? mockOrders.find(o => o.id === bill.orderId) : undefined

  if (!bill || !order) {
    return <div className="p-8">ไม่พบบิลนี้</div>
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print()
  }

  const handleDownload = () => {
    downloadPDF("mock bill pdf", `bill-${bill.id}.pdf`)
  }

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="print:hidden bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/admin/bills`}>
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">บิล {bill.id}</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePrint}>
              <Print className="mr-2 h-4 w-4" />
              พิมพ์
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              ดาวน์โหลด PDF
            </Button>
            <Button variant="outline" onClick={handleCopy}>
              <Copy className="mr-2 h-4 w-4" />
              คัดลอกลิงก์
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 print:p-0">
        <Card className="max-w-3xl mx-auto print:shadow-none print:border-none">
          <CardContent className="p-8 print:p-6 space-y-6 print:w-[210mm] print:min-h-[297mm]">
            <BillPreview order={order} />
            <div className="h-32 w-full border print:mt-8 flex items-center justify-center text-sm text-gray-500">
              Sticker Label
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
