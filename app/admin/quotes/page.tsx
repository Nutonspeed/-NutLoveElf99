"use client"
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { exportQuotesCSV, mockQuotes } from '@/lib/mock-quotes'

export default function AdminQuotesPage() {
  const [csvPreview, setCsvPreview] = useState('')
  const [status, setStatus] = useState('all')

  const filtered = mockQuotes.filter(q => status === 'all' || q.status === status)

  const prepareExport = () => {
    setCsvPreview(exportQuotesCSV())
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-2">
          <Link href="/admin">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ใบเสนอราคา</h1>
          <div className="ml-auto">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" onClick={prepareExport}>
                  <FileText className="mr-2 h-4 w-4" />Export CSV
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>CSV Preview</DialogTitle>
                </DialogHeader>
                <pre className="whitespace-pre-wrap text-xs max-h-60 overflow-auto">
                  {csvPreview}
                </pre>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>รายการ</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell>{q.id}</TableCell>
                    <TableCell>{q.customerId}</TableCell>
                    <TableCell>{q.status}</TableCell>
                    <TableCell>
                      <Link href={`/admin/quotes/${q.id}`}>
                        <Button size="sm" variant="outline">เปิด</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      ไม่มีข้อมูล
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
