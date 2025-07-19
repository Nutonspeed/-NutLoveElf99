"use client"
import { useEffect, useState } from "react"
import { getEmailLogs, loadEmailData } from "@/lib/mock-email"
import { Input } from "@/components/ui/inputs/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function EmailLogPage() {
  const [logs, setLogs] = useState(getEmailLogs())
  const [filter, setFilter] = useState("")

  useEffect(() => {
    loadEmailData()
    setLogs([...getEmailLogs()])
  }, [])

  const filtered = logs.filter(
    (l) =>
      l.to.includes(filter) ||
      (l.orderId && l.orderId.includes(filter))
  )

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Email Logs</h1>
      <Input
        placeholder="ค้นหา email หรือ order"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-xs"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>เวลา</TableHead>
            <TableHead>ผู้รับ</TableHead>
            <TableHead>หัวข้อ</TableHead>
            <TableHead>Order</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((l) => (
            <TableRow key={l.id}>
              <TableCell>{new Date(l.sentAt).toLocaleString('th-TH')}</TableCell>
              <TableCell>{l.to}</TableCell>
              <TableCell>{l.subject}</TableCell>
              <TableCell>{l.orderId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
