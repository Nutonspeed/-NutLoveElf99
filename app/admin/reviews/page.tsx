"use client"
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/contexts/auth-context'

interface Review {
  id: string
  product: string
  customer: string
  rating: number
  comment: string
}

const mockReviews: Review[] = [
  { id: '1', product: 'ผ้าคลุมโซฟา Velvet', customer: 'John Doe', rating: 5, comment: 'ดีมาก' },
  { id: '2', product: 'ผ้าคลุม Cotton', customer: 'Jane Smith', rating: 3, comment: 'พอใช้ได้' },
]

function firstNameOnly(name: string) {
  return name.split(' ')[0]
}

export default function AdminReviewsPage() {
  const { user, isAuthenticated } = useAuth()
  const [notes, setNotes] = useState<Record<string, string>>({})

  if (!isAuthenticated || user?.role !== 'admin') return null

  const getTag = (r: Review) => (r.rating >= 4 ? 'พึงพอใจมาก' : 'มีข้อเสนอแนะ')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">รีวิวลูกค้า</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>รวม Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>สินค้า</TableHead>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>คะแนน</TableHead>
                  <TableHead>ความคิดเห็น</TableHead>
                  <TableHead>แท็ก</TableHead>
                  <TableHead className="text-right">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReviews.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>{r.product}</TableCell>
                    <TableCell>{firstNameOnly(r.customer)}</TableCell>
                    <TableCell>{r.rating}</TableCell>
                    <TableCell>{r.comment}</TableCell>
                    <TableCell>{getTag(r)}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="secondary">ตอบกลับภายในทีม</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>บันทึกภายในทีม</DialogTitle>
                          </DialogHeader>
                          <Textarea
                            value={notes[r.id] || ''}
                            onChange={e => setNotes({ ...notes, [r.id]: e.target.value })}
                            className="mt-2"
                            rows={4}
                          />
                        </DialogContent>
                      </Dialog>
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
