"use client"
import { useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockBills } from "@/lib/mock-bills"

export default function AdminReportsPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const today = new Date()
  const past = new Date()
  past.setDate(today.getDate() - 30)
  const [start, setStart] = useState(past.toISOString().slice(0,10))
  const [end, setEnd] = useState(today.toISOString().slice(0,10))

  const filtered = useMemo(() => {
    const s = new Date(start)
    const e = new Date(end + "T23:59:59")
    return mockBills.filter(b => {
      const d = new Date(b.createdAt)
      const matchStatus = status === "all" || b.status === status
      const matchSearch = b.id.toLowerCase().includes(search.toLowerCase()) ||
        (b.orderId && b.orderId.toLowerCase().includes(search.toLowerCase()))
      const matchDate = d >= s && d <= e
      return matchStatus && matchSearch && matchDate
    })
  }, [search, status, start, end])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-4">รายงานบิล</h1>
          <div className="flex flex-wrap items-end gap-2">
            <Input type="date" value={start} onChange={e=>setStart(e.target.value)} />
            <Input type="date" value={end} onChange={e=>setEnd(e.target.value)} />
            <Input
              placeholder="ค้นหาด้วยเลขบิล/ออร์เดอร์"
              value={search}
              onChange={e=>setSearch(e.target.value)}
              className="min-w-[150px] flex-1"
            />
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="สถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                <SelectItem value="pending">รอตรวจสอบ</SelectItem>
                <SelectItem value="unpaid">รอชำระ</SelectItem>
                <SelectItem value="paid">ชำระแล้ว</SelectItem>
                <SelectItem value="cancelled">ยกเลิก</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>รายการบิล ({filtered.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filtered.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>เลขบิล</TableHead>
                    <TableHead>ออร์เดอร์</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead>วันที่</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(b => (
                    <TableRow key={b.id}>
                      <TableCell>
                        <Link href={`/admin/invoices/${b.id}`} className="underline">
                          {b.id}
                        </Link>
                      </TableCell>
                      <TableCell>{b.orderId}</TableCell>
                      <TableCell>{b.status}</TableCell>
                      <TableCell>{new Date(b.createdAt).toLocaleDateString("th-TH")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center py-8 text-sm text-gray-500">ไม่พบข้อมูล</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
