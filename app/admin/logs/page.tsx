"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { logs, loadLogs, exportLogsTxt, exportLogsJson } from '@/lib/logs'

export default function LogsPage() {
  const { user, isAuthenticated } = useAuth()
  const [entries, setEntries] = useState([...logs])

  useEffect(() => {
    loadLogs()
    setEntries([...logs])
  }, [])

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link href="/">
          <Button>กลับหน้าแรก</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8 space-x-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">บันทึกระบบ</h1>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" onClick={() => exportLogsTxt(entries, 'logs.txt')}>Export TXT</Button>
            <Button variant="outline" onClick={() => exportLogsJson(entries, 'logs.json')}>Export JSON</Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Logs ({entries.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เวลา</TableHead>
                  <TableHead>การกระทำ</TableHead>
                  <TableHead>ข้อมูล</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{JSON.stringify(log.payload)}</TableCell>
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
