"use client"
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/auth-context'
import { mockClaims, updateClaim } from '@/lib/mock-claims'
import { addAdminLog } from '@/lib/mock-admin-logs'
import { downloadCSV, downloadPDF } from '@/lib/mock-export'

export default function AdminClaimsPage() {
  const { user, isAuthenticated } = useAuth()
  const [claims, setClaims] = useState([...mockClaims])

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

  const handleApprove = (id: string) => {
    const c = mockClaims.find((cl) => cl.id === id)
    if (!c || c.status !== 'pending') return
    updateClaim(id, { status: 'approved' })
    addAdminLog(`approve claim ${id}`, user?.email || 'admin')
    setClaims([...mockClaims])
  }

  const handleReject = (id: string) => {
    const c = mockClaims.find((cl) => cl.id === id)
    if (!c || c.status !== 'pending') return
    const reason = window.prompt('เหตุผลการปฏิเสธ') || ''
    updateClaim(id, { status: 'rejected', reason })
    addAdminLog(`reject claim ${id}`, user?.email || 'admin')
    setClaims([...mockClaims])
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
          <h1 className="text-3xl font-bold">เคลมสินค้า</h1>
          <Button onClick={() => downloadCSV(claims, 'claims.csv')}>Export CSV</Button>
          <Button onClick={() => downloadPDF('claims report', 'claims.pdf')}>Export PDF</Button>
        </div>
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">รอตรวจสอบ</TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>รายการเคลม ({claims.filter(c => c.status === 'pending').length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ออเดอร์</TableHead>
                      <TableHead>รูป</TableHead>
                      <TableHead>เหตุผล</TableHead>
                      <TableHead className="text-right">การจัดการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {claims.filter(c => c.status === 'pending').map((c) => (
                      <TableRow key={c.id}>
                        <TableCell>{c.orderId}</TableCell>
                        <TableCell>
                          <img src={c.image} alt="img" className="h-12 w-12" />
                        </TableCell>
                        <TableCell>{c.reason}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="sm" onClick={() => handleApprove(c.id)}>อนุมัติ</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleReject(c.id)}>
                            ไม่รับเคลม
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
