"use client"

import { useState } from "react"
import Link from "next/link"
import { useBillStore, type BillRecord } from "@/stores/billStore"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/cards/card"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Input } from "@/components/ui/inputs/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/buttons/button"

export default function BillListPage() {
  const bills = useBillStore((s) => s.bills)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<"all" | BillRecord["status"]>("all")

  const filtered = [...bills]
    .sort(
      (a, b) =>
        new Date((b as any).createdAt || 0).getTime() -
        new Date((a as any).createdAt || 0).getTime(),
    )
    .filter((b) =>
      status === "all" ? true : b.status === status,
    )
    .filter((b) =>
      b.customer.toLowerCase().includes(search.toLowerCase()),
    )

  const statusBadge = (s: BillRecord["status"]) => {
    if (s === "paid")
      return <Badge className="bg-green-500 text-white">paid</Badge>
    if (s === "overdue")
      return <Badge className="bg-red-500 text-white">overdue</Badge>
    return <Badge className="bg-gray-500 text-white">draft</Badge>
  }

  return (
    <div className="space-y-6 p-4" data-testid="bill-list-page">
      <Card>
        <CardHeader>
          <CardTitle>รายการบิล ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <Input
              placeholder="ค้นหาลูกค้า"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48"
            />
            <Select value={status} onValueChange={(v) => setStatus(v as any)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="สถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                <SelectItem value="draft">draft</SelectItem>
                <SelectItem value="paid">paid</SelectItem>
                <SelectItem value="overdue">overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader className="hidden sm:table-header-group">
              <TableRow>
                <TableHead>Bill ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((b) => (
                <TableRow
                  key={b.id}
                  className="flex flex-col sm:table-row border-b last:border-0"
                >
                  <TableCell className="font-medium" data-label="Bill ID">
                    {b.id}
                  </TableCell>
                  <TableCell data-label="Customer">{b.customer}</TableCell>
                  <TableCell data-label="Amount">฿{b.amount}</TableCell>
                  <TableCell data-label="Status">{statusBadge(b.status)}</TableCell>
                  <TableCell data-label="Created">
                    {b.createdAt
                      ? new Date(b.createdAt).toLocaleDateString("th-TH")
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right" data-label="Actions">
                    <Link href={`/admin/orders/${b.id}`}>
                      <Button variant="outline" size="sm">
                        ดูรายละเอียด
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-sm">
                    ไม่พบข้อมูล
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
