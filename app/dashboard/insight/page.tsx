"use client"
import { useMemo } from "react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getBills } from "@/core/mock/store"

function billTotal(b: any) {
  return b.items.reduce((s: number, i: any) => s + i.price * i.quantity, 0) + b.shipping
}

export default function InsightDashboard() {
  const bills = getBills()

  const totalRevenue = useMemo(
    () => bills.filter(b => b.status === "paid").reduce((s, b) => s + billTotal(b), 0),
    [bills],
  )

  const statusSummary = useMemo(() => {
    const map: Record<string, number> = {}
    bills.forEach(b => {
      map[b.status] = (map[b.status] || 0) + 1
    })
    return map
  }, [bills])

  const daily = useMemo(() => {
    const m = new Map<string, number>()
    bills.forEach(b => {
      const key = b.createdAt.slice(0, 10)
      m.set(key, (m.get(key) || 0) + 1)
    })
    return Array.from(m.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, count]) => ({ date, count }))
  }, [bills])

  const monthly = useMemo(() => {
    const m = new Map<string, number>()
    bills.forEach(b => {
      const d = new Date(b.createdAt)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      m.set(key, (m.get(key) || 0) + 1)
    })
    return Array.from(m.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, count]) => ({ date, count }))
  }, [bills])

  const topCustomers = useMemo(() => {
    const map = new Map<string, { count: number; total: number }>()
    bills.forEach(b => {
      const t = billTotal(b)
      const entry = map.get(b.customer) || { count: 0, total: 0 }
      entry.count += 1
      entry.total += t
      map.set(b.customer, entry)
    })
    return Array.from(map.entries())
      .map(([name, v]) => ({ name, count: v.count, total: v.total }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }, [bills])

  return (
    <div className="container mx-auto space-y-6 py-8">
      <h1 className="text-2xl font-bold">Store Insight</h1>
      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>฿{totalRevenue.toLocaleString()}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Bill Status Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {Object.entries(statusSummary).map(([s, c]) => (
            <Badge key={s} variant="outline">
              {s}: {c}
            </Badge>
          ))}
        </CardContent>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bills per Day</CardTitle>
          </CardHeader>
          <CardContent className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={daily}>
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#0ea5e9" name="bills" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bills per Month</CardTitle>
          </CardHeader>
          <CardContent className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly}>
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" name="bills" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Top Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">Bills</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCustomers.map(c => (
                <TableRow key={c.name}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell className="text-right">{c.count}</TableCell>
                  <TableCell className="text-right">฿{c.total.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
