"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import PageWrapper from '@/components/admin/PageWrapper'
import {
  FacebookLead,
  listLeads,
  loadLeads,
  exportPendingCsv,
} from '@/lib/mock-facebook-leads'

export default function FacebookInboxPage() {
  const [leads, setLeads] = useState<FacebookLead[]>([])

  useEffect(() => {
    loadLeads()
    setLeads([...listLeads()])
  }, [])

  const exportCsv = () => {
    const csv = exportPendingCsv()
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'facebook-leads.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <PageWrapper title="Facebook Inbox" breadcrumb={[{ title: 'แดชบอร์ด', href: '/admin' }, { title: 'Facebook Inbox' }] }>
      <Card>
        <CardHeader>
          <CardTitle>Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-right mb-2">
            <Button size="sm" variant="outline" onClick={exportCsv}>จัดการทั้งหมด</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ชื่อ</TableHead>
                <TableHead>ข้อความล่าสุด</TableHead>
                <TableHead>เบอร์โทร</TableHead>
                <TableHead>วันที่</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map(l => (
                <TableRow key={l.id}>
                  <TableCell>{l.name}</TableCell>
                  <TableCell>{l.message}</TableCell>
                  <TableCell>{l.phone}</TableCell>
                  <TableCell>{new Date(l.timestamp).toLocaleString()}</TableCell>
                  <TableCell>
                    <Link href={`/admin/bill/create?leadId=${l.id}`} className="underline text-primary">ยิงบิลให้เลย</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {leads.length === 0 && <p className="text-center py-4 text-sm text-gray-500">ไม่มีข้อมูล</p>}
        </CardContent>
      </Card>
    </PageWrapper>
  )
}
