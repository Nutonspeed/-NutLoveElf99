"use client"
import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Button } from "@/components/ui/buttons/button"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { mockBills, type AdminBill } from "@/mock/bills"
import { downloadCSV, downloadPDF } from "@/lib/mock-export"

export default function BillAnalyticsPage() {
  const stats = useMemo(() => {
    const total = mockBills.length
    const paid = mockBills.filter(b => b.status === "paid").length
    const unpaid = total - paid
    const overdue = mockBills.filter(
      b => b.status !== "paid" && new Date(b.createdAt).getTime() < Date.now() - 7 * 24 * 60 * 60 * 1000,
    ).length
    return { total, paid, unpaid, overdue }
  }, [])

  const dailyData = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      const label = d.toLocaleDateString("th-TH", { month: "short", day: "numeric" })
      const count = mockBills.filter(
        b => new Date(b.createdAt).toDateString() === d.toDateString(),
      ).length
      return { date: label, count }
    })
  }, [])

  const pieData = useMemo(() => [
    { name: "paid", value: stats.paid },
    { name: "unpaid", value: stats.unpaid },
  ], [stats])

  const topCustomers = useMemo(() => {
    const totals: Record<string, number> = {}
    mockBills.forEach(b => {
      totals[b.customer] = (totals[b.customer] || 0) + getTotal(b)
    })
    return Object.entries(totals)
      .map(([customer, total]) => ({ customer, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)
  }, [])

  const exportCSV = () => {
    const rows = topCustomers.map(t => ({ customer: t.customer, total: t.total }))
    downloadCSV(rows, "bill-analytics.csv")
  }

  const exportPDF = () => {
    downloadPDF("bill analytics", "bill-analytics.pdf")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">วิเคราะห์บิล</h1>
          <div className="space-x-2">
            <Button onClick={exportCSV}>Export CSV</Button>
            <Button onClick={exportPDF}>Export PDF</Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ภาพรวม</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="ทั้งหมด" value={stats.total} />
            <Stat label="ชำระแล้ว" value={stats.paid} />
            <Stat label="ค้างชำระ" value={stats.unpaid} />
            <Stat label="เลยกำหนด" value={stats.overdue} />
          </CardContent>
        </Card>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>จำนวนบิลรายวัน</CardTitle>
            </CardHeader>
            <CardContent className="h-60">
              <ChartContainer className="h-full" config={{ bills: { color: "hsl(221,83%,53%)" } }}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-bills)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>สัดส่วนชำระแล้ว/ค้าง</CardTitle>
            </CardHeader>
            <CardContent className="h-60 flex items-center justify-center">
              <ChartContainer className="h-full" config={{ paid: { color: "#4ade80" }, unpaid: { color: "#f87171" } }}>
                <PieChart>
                  <Pie dataKey="value" data={pieData} outerRadius={80}>
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={`var(--color-${entry.name})`} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ลูกค้ายอดใช้จ่ายสูงสุด</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-1 list-decimal list-inside">
              {topCustomers.map(tc => (
                <li key={tc.customer} className="flex justify-between">
                  <span>{tc.customer}</span>
                  <span className="text-gray-600">฿{tc.total.toLocaleString()}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

function getTotal(b: AdminBill) {
  return b.items.reduce((s, i) => s + i.price * i.quantity, 0) + b.shipping
}
