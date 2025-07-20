"use client"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import EmptyState from "@/components/EmptyState"
import { metricsLogs, loadMetricsLogs } from "@/lib/mock-metrics-logs"

export default function MetricsLogsPage() {
  const [logs, setLogs] = useState(metricsLogs)

  useEffect(() => {
    loadMetricsLogs()
    setLogs([...metricsLogs])
  }, [])

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Metrics API Usage</h1>
      {logs.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Path</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((l) => (
              <TableRow key={l.id}>
                <TableCell>{new Date(l.timestamp).toLocaleString()}</TableCell>
                <TableCell>{l.origin}</TableCell>
                <TableCell>{l.path}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <EmptyState title="ยังไม่มีข้อมูล" />
      )}
    </div>
  )
}
