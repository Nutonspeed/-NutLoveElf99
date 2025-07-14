"use client"
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { mockAdminLogs, addAdminLog } from '@/lib/mock-admin-logs'

export default function AdminLogsPage() {
  const { user, isAuthenticated } = useAuth()
  const [logs, setLogs] = useState([...mockAdminLogs])
  const [filter, setFilter] = useState('all')

  const filtered = logs.filter((l) => {
    if (filter === 'user') return l.admin === user?.email
    if (filter === 'order') return l.action.includes('order')
    if (filter === 'bill') return l.action.includes('bill')
    return true
  })

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
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">บันทึกการทำงาน</h1>
        </div>
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Admin Logs ({filtered.length})</CardTitle>
            {process.env.NODE_ENV !== 'production' && (
              <Button onClick={() => { addAdminLog('dev mock', 'admin'); setLogs([...mockAdminLogs]) }}>สร้าง log ใหม่ (dev only)</Button>
            )}
            <select
              className="border rounded p-2 ml-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">ทั้งหมด</option>
              <option value="user">ตามผู้ใช้</option>
              <option value="order">เฉพาะออเดอร์</option>
              <option value="bill">เฉพาะบิล</option>
            </select>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เวลา</TableHead>
                  <TableHead>ผู้ดำเนินการ</TableHead>
                  <TableHead>การกระทำ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{log.admin}</TableCell>
                    <TableCell>{log.action}</TableCell>
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
