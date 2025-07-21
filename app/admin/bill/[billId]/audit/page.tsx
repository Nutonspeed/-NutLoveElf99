"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getBillAuditLogs, loadBillAuditLogs, exportBillAuditCsv, BillAuditLog } from '@/lib/mock-bill-audit'

export default function BillAuditPage({ params }: { params: { billId: string } }) {
  const { billId } = params
  const [logs, setLogs] = useState<BillAuditLog[]>([])

  useEffect(() => {
    loadBillAuditLogs()
    setLogs(getBillAuditLogs(billId))
  }, [billId])

  const risky = (idx: number) => {
    const current = logs[idx]
    if (!current) return false
    const prev = logs[idx + 1]
    if (!prev) return false
    const diff = new Date(current.timestamp).getTime() - new Date(prev.timestamp).getTime()
    return current.action === 'view' && prev.action === 'view' && diff < 5 * 60 * 1000
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href={`/admin/bills`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Audit Bill {billId}</h1>
          <Button className="ml-auto" variant="outline" onClick={() => exportBillAuditCsv(logs, `bill-${billId}-audit.csv`)}>
            Export CSV
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Access Logs ({logs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log, idx) => (
                  <TableRow key={log.id} className={risky(idx) ? 'bg-red-100' : ''}>
                    <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.ip}</TableCell>
                    <TableCell>{log.device}</TableCell>
                    <TableCell>{log.role}</TableCell>
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
