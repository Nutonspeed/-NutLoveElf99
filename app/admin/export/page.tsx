"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { mockBills } from "@/lib/mock-bills"
import { mockProducts } from "@/lib/mock-products"
import { mockClaims } from "@/lib/mock-claims"
import { quotes } from "@/lib/mock-quotes"
import { downloadCSV, downloadPDF, downloadJSON } from "@/lib/mock-export"

export default function AdminExportPage() {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)

  const runExport = (fn: () => void) => {
    setLoading(true)
    setProgress(0)
    const duration = 1000 + Math.random() * 1000
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min(100, (elapsed / duration) * 100)
      setProgress(pct)
      if (pct >= 100) {
        clearInterval(timer)
        if (Math.random() < 0.1) {
          toast.error("ไม่สามารถส่งออกข้อมูล กรุณาลองใหม่")
        } else {
          fn()
          toast.success("ส่งออกสำเร็จ!")
        }
        setLoading(false)
        setTimeout(() => setProgress(0), 300)
      }
    }, 100)
  }

  const exportBills = () => {
    runExport(() => {
      const rows = mockBills.map(b => ({
        id: b.id,
        customer: b.customer,
        amount: b.items.reduce((s,it)=>s+it.price*it.quantity,0) + b.shipping,
        status: b.status,
      }))
      downloadCSV(rows, "bills.csv")
    })
  }

  const exportProducts = () => {
    runExport(() => {
      downloadJSON(mockProducts, "products.json")
    })
  }

  const exportSummary = () => {
    runExport(() => {
      const content = `Claims: ${mockClaims.length}\nQuotes: ${quotes.length}`
      downloadPDF(content, "summary.pdf")
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Data Export (mock)</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-x-2">
              <Button onClick={exportBills} disabled={loading}>
                <Download className="h-4 w-4 mr-2" /> Export Bills CSV
              </Button>
              <Button onClick={exportProducts} disabled={loading}>
                <Download className="h-4 w-4 mr-2" /> Export Products JSON
              </Button>
              <Button onClick={exportSummary} disabled={loading}>
                <Download className="h-4 w-4 mr-2" /> Export Summary PDF
              </Button>
            </div>
            {loading && <Progress value={progress} className="h-2" />}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
