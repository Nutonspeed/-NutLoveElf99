"use client"
import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/cards/card"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/inputs/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import { getAllBills } from '@/lib/data/bills'
import { getAllCustomers } from '@/lib/data/customers'
import type { AdminBill } from '@/mock/bills'
import type { Customer } from '@/types/customer'
import { downloadCSV, downloadPDF } from "@/lib/mock-export"

function getTotal(b: AdminBill) {
  return b.items.reduce((s, i) => s + i.price * i.quantity, 0) + b.shipping
}

export default function BillingReportPage() {
  const [tag, setTag] = useState("all")
  const [group, setGroup] = useState("all")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [bills, setBills] = useState<AdminBill[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    getAllBills().then(setBills)
    getAllCustomers().then(setCustomers)
  }, [])

  const filtered = useMemo(() => {
    return bills.filter((b) => {
      const c = customers.find((c) => c.name === b.customer)
      if (tag !== "all" && !c?.tags?.includes(tag)) return false
      if (group !== "all" && c?.tier !== group) return false
      const d = new Date(b.createdAt).getTime()
      if (start && d < new Date(start).getTime()) return false
      if (end && d > new Date(end + "T23:59:59").getTime()) return false
      return true
    })
  }, [tag, group, start, end, bills, customers])

  const totalBilled = filtered.reduce((s, b) => s + getTotal(b), 0)
  const paidRate = filtered.length
    ? filtered.filter((b) => b.status === "paid").length / filtered.length
    : 0
  const avgPay = useMemo(() => {
    const paid = filtered.filter((b) => b.status === "paid")
    if (paid.length === 0) return 0
    const totalDays = paid.reduce((s, b) => {
      const created = new Date(b.createdAt).getTime()
      const paidAt = created + 24 * 60 * 60 * 1000
      return s + (paidAt - created) / (1000 * 60 * 60 * 24)
    }, 0)
    return totalDays / paid.length
  }, [filtered])

  const daily = useMemo(() => {
    const map = new Map<string, number>()
    for (const b of filtered) {
      const key = b.createdAt.slice(0, 10)
      map.set(key, (map.get(key) || 0) + getTotal(b))
    }
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, total]) => ({ date, total }))
  }, [filtered])

  const exportCsv = () => {
    downloadCSV(
      filtered.map((b) => ({
        id: b.id,
        status: b.status,
        total: getTotal(b),
        date: b.createdAt.slice(0, 10),
      })),
      "billing-report.csv",
    )
  }

  const exportPdf = () => {
    downloadPDF(
      `Total billed: ${totalBilled}\nPaid rate: ${(
        paidRate * 100
      ).toFixed(2)}%`,
      "billing-report.pdf",
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/reports">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Billing Performance (mock)</h1>
            <p className="text-gray-600">สรุปประสิทธิภาพการวางบิล</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={tag} onValueChange={setTag}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              {Array.from(new Set(mockCustomers.flatMap((c) => c.tags || []))).map(
                (t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
          <Select value={group} onValueChange={setGroup}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทุกกลุ่ม</SelectItem>
              {Array.from(new Set(mockCustomers.map((c) => c.tier))).map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
          <Button onClick={exportCsv} variant="outline">
            <Download className="h-4 w-4" /> CSV
          </Button>
          <Button onClick={exportPdf} variant="outline">
            <Download className="h-4 w-4" /> PDF
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>ยอดบิลรวม</CardTitle>
            </CardHeader>
            <CardContent>
              ฿{totalBilled.toLocaleString()}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>อัตราชำระเงิน</CardTitle>
            </CardHeader>
            <CardContent>
              {(paidRate * 100).toFixed(1)}%
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>เวลาเฉลี่ยในการชำระ (วัน)</CardTitle>
            </CardHeader>
            <CardContent>
              {avgPay.toFixed(1)}
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ยอดบิลรายวัน</CardTitle>
          </CardHeader>
          <CardContent className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={daily}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#8884d8" name="ยอดบิล" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>รายการบิล</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">ยอดรวม</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>{b.id}</TableCell>
                    <TableCell>{b.status}</TableCell>
                    <TableCell className="text-right">฿{getTotal(b).toLocaleString()}</TableCell>
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
