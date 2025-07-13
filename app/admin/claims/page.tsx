"use client"
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/contexts/auth-context'
import { mockClaims, updateClaim } from '@/lib/mock-claims'
import { exportCSV } from '@/lib/mock-export'

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
    updateClaim(id, { status: 'approved' })
    setClaims([...mockClaims])
  }

  const handleReject = (id: string) => {
    const reason = window.prompt('เหตุผลการปฏิเสธ') || ''
    updateClaim(id, { status: 'rejected', reason })
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
          <Button onClick={() => { const csv = exportCSV(claims); const preview = csv.split('\n').slice(0,4).join('\n'); alert(preview); }}>Export CSV</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>รายการเคลม ({claims.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ออเดอร์</TableHead>
                  <TableHead>รูป</TableHead>
                  <TableHead>เหตุผล</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {claims.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.orderId}</TableCell>
                    <TableCell>
                      <img src={c.image} alt="img" className="h-12 w-12" />
                    </TableCell>
                    <TableCell>{c.reason}</TableCell>
                    <TableCell>{c.status}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" onClick={() => handleApprove(c.id)}>
                        อนุมัติ
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleReject(c.id)}>
                        ปฏิเสธ
                      </Button>
                    </TableCell>
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
