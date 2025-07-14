"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { loadBillLogs, listBillLogs, type BillLogEntry } from '@/lib/mock-bill-log'
import { useAuth } from '@/contexts/auth-context'

export default function BillLogPage() {
  const { user, isAuthenticated } = useAuth()
  const [logs, setLogs] = useState<BillLogEntry[]>([])

  useEffect(() => {
    loadBillLogs()
    setLogs([...listBillLogs()])
  }, [])

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่มีสิทธิ์เข้าถึง</h1>
          <Link href="/">
            <Button>กลับหน้าแรก</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">บันทึกการเปิดบิล</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Logs ({logs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เวลา</TableHead>
                  <TableHead>Ref</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>หมายเหตุ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{new Date(log.openedAt).toLocaleString('th-TH')}</TableCell>
                    <TableCell>{log.ref}</TableCell>
                    <TableCell>{log.status}</TableCell>
                    <TableCell>{log.note}</TableCell>
                  </TableRow>
                ))}
                {logs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-sm text-gray-500">
                      ไม่มีรายการ
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
