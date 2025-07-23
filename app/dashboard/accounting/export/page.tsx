"use client"
import { useMemo } from "react"
import { mockOrders } from "@/lib/mock-orders"
import { getConfig } from "@/core/mock/store"
import { downloadCSV, downloadPDF } from "@/lib/mock-export"

export default function AccountingExportPage() {
  const summary = useMemo(() => {
    const map: Record<string, { total: number; tax: number }> = {}
    const rate = getConfig().tax.rate / 100
    mockOrders.forEach(o => {
      const d = new Date(o.createdAt)
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`
      if (!map[key]) map[key] = { total: 0, tax: 0 }
      map[key].total += o.total
      map[key].tax += Math.round(o.total * rate)
    })
    return Object.entries(map).map(([month, val]) => ({ month, ...val }))
  }, [])

  const handleCSV = () => downloadCSV(summary, 'accounting.csv')
  const handlePDF = () => downloadPDF('mock accounting pdf', 'accounting.pdf')

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">สรุปบัญชี</h1>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">เดือน</th>
            <th className="p-2 text-right">ยอดขาย</th>
            <th className="p-2 text-right">ภาษี</th>
          </tr>
        </thead>
        <tbody>
          {summary.map(s => (
            <tr key={s.month} className="border-b">
              <td className="p-2">{s.month}</td>
              <td className="p-2 text-right">฿{s.total.toLocaleString()}</td>
              <td className="p-2 text-right">฿{s.tax.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2">
        <button onClick={handleCSV} className="border rounded px-4 py-2">Export CSV</button>
        <button onClick={handlePDF} className="border rounded px-4 py-2">Export PDF</button>
      </div>
    </div>
  )
}
