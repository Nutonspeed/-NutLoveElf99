"use client"
import { useEffect, useMemo, useState } from "react"
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"

interface Bill {
  status: string
  paymentStatus: string
  createdAt: string
  followup_log?: string[]
}

export default function InsightKpiPage() {
  const [bills, setBills] = useState<Bill[]>([])

  useEffect(() => {
    fetch("/mock/store/bills.json")
      .then(r => r.json())
      .then(setBills)
      .catch(() => setBills([]))
  }, [])

  const totalBills = bills.length
  const paidCount = bills.filter(b => b.paymentStatus === "paid").length
  const unpaidCount = totalBills - paidCount
  const followupCount = bills.filter(b => (b.followup_log?.length || 0) > 0).length
  const paidAfterFollow = bills.filter(
    b => b.status === "paid" && (b.followup_log?.length || 0) > 0,
  ).length

  const paidPct = totalBills ? Math.round((paidCount / totalBills) * 100) : 0
  const unpaidPct = totalBills ? Math.round((unpaidCount / totalBills) * 100) : 0
  const followupPct = totalBills ? Math.round((followupCount / totalBills) * 100) : 0
  const recoveryPct = followupCount ? Math.round((paidAfterFollow / followupCount) * 100) : 0

  const COLORS = ["#0088FE", "#FF8042"]

  const trendData = useMemo(() => {
    const now = new Date()
    const start = new Date()
    start.setDate(now.getDate() - 6)
    const days: { date: string; count: number }[] = []
    for (let d = new Date(start); d <= now; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().slice(0, 10)
      const count = bills.reduce(
        (c, b) => c + (b.followup_log?.filter(f => f.slice(0, 10) === key).length || 0),
        0,
      )
      days.push({ date: key.slice(5), count })
    }
    return days
  }, [bills])

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Billing KPI</h1>
      <div className="grid gap-4 sm:grid-cols-5">
        <Card>
          <CardHeader>
            <CardTitle>Total Bills</CardTitle>
          </CardHeader>
          <CardContent>{totalBills}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>% Paid</CardTitle>
          </CardHeader>
          <CardContent>{paidPct}%</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>% Unpaid</CardTitle>
          </CardHeader>
          <CardContent>{unpaidPct}%</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>% Follow-up</CardTitle>
          </CardHeader>
          <CardContent>{followupPct}%</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recovery</CardTitle>
          </CardHeader>
          <CardContent>{recoveryPct}%</CardContent>
        </Card>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Paid vs Unpaid</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PieChart width={200} height={200}>
              <Pie
                data={[
                  { name: "Paid", value: paidCount },
                  { name: "Unpaid", value: unpaidCount },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                <Cell fill={COLORS[0]} />
                <Cell fill={COLORS[1]} />
              </Pie>
            </PieChart>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Follow-up Done</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PieChart width={200} height={200}>
              <Pie
                data={[
                  { name: "Followed", value: followupCount },
                  { name: "No Follow", value: totalBills - followupCount },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                <Cell fill={COLORS[0]} />
                <Cell fill={COLORS[1]} />
              </Pie>
            </PieChart>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Follow-up Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" name="follow" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
