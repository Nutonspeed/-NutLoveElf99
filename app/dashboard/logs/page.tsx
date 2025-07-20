"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { loadAdminLogs, mockAdminLogs, type AdminLog } from "@/lib/mock-admin-logs"

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<AdminLog[]>([])

  useEffect(() => {
    loadAdminLogs()
    setLogs([...mockAdminLogs])
  }, [])

  const sorted = [...logs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">กิจกรรมล่าสุด</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>เวลา</TableHead>
            <TableHead>การกระทำ</TableHead>
            <TableHead>แอดมิน</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map(log => (
            <TableRow key={log.id} className="hover:bg-muted/50">
              <TableCell className="whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</TableCell>
              <TableCell>
                <Link href={`/dashboard/logs/${log.id}`} className="underline">
                  {log.action}
                </Link>
              </TableCell>
              <TableCell>{log.admin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
