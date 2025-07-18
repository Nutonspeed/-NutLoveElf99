"use client"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import EmptyState from "@/components/EmptyState"
import { accessLogs, loadAccessLogs } from "@/lib/mock-access-logs"

export default function AccessLogPage() {
  const [logs, setLogs] = useState(accessLogs)
  useEffect(() => {
    loadAccessLogs()
    setLogs([...accessLogs])
  }, [])

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Access Log</h1>
      {logs.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IP</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map(l => (
              <TableRow key={l.id}>
                <TableCell>{l.ip}</TableCell>
                <TableCell className="truncate max-w-xs">{l.device}</TableCell>
                <TableCell>{new Date(l.time).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <EmptyState title="ยังไม่มีข้อมูลการเข้าใช้งาน" />
      )}
    </div>
  )
}
