"use client"
import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Button } from "@/components/ui/buttons/button"
import { getOrders, getCustomers } from "@/core/mock/store"
import { formatCurrency } from "@/lib/utils"

export default function ExportDashboardPage() {
  const [range, setRange] = useState(30)
  const orders = getOrders()
  const customers = getCustomers()

  const filtered = useMemo(() => {
    const start = new Date()
    start.setDate(start.getDate() - range)
    return orders.filter(o => new Date(o.createdAt) >= start)
  }, [orders, range])

  const totalSales = filtered.reduce((s,o)=>s+o.total,0)

  const handleExport = () => {
    const text = `รายงานยอดขาย ${formatCurrency(totalSales)} ใน ${range} วัน\nจำนวนออเดอร์ ${filtered.length}`
    const blob = new Blob([text], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'report.pdf'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Export Dashboard (mock)</h1>
      <div className="flex items-center gap-2">
        <label className="text-sm">ช่วงวัน:</label>
        <input type="number" value={range} onChange={e=>setRange(parseInt(e.target.value)||1)} className="w-20 border rounded-md p-1" />
      </div>
      <Card>
        <CardHeader><CardTitle>สรุป</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <p>ยอดขาย: {formatCurrency(totalSales)}</p>
          <p>ออเดอร์: {filtered.length}</p>
          <p>ลูกค้าใหม่: {customers.length}</p>
          <Button onClick={handleExport}>Export PDF</Button>
        </CardContent>
      </Card>
    </div>
  )
}
