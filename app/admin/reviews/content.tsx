"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import EmptyState from '@/components/ui/EmptyState'

interface Feedback {
  id: string
  billId: string
  rating: number
  message?: string
  timestamp: string
  tags?: string[]
  public?: boolean
}

export default function AdminReviewsPage() {
  const [list, setList] = useState<Feedback[]>([])
  const [rating, setRating] = useState('all')
  const [sort, setSort] = useState<'date' | 'rating'>('date')
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/feedback')
      .then((r) => r.json())
      .then((d) => setList(d.feedback || []))
      .catch(() => setError(true))
  }, [])

  const items = list
    .filter((f) => rating === 'all' || f.rating === Number(rating))
    .sort((a, b) => {
      if (sort === 'date') return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      return b.rating - a.rating
    })

  const togglePublic = (id: string, value: boolean) => {
    fetch('/api/feedback', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, public: value }),
    }).then(() => {
      setList((prev) => prev.map((f) => (f.id === id ? { ...f, public: value } : f)))
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Customer Feedback</h1>
          <Link href="/admin/reviews/analytics" className="ml-auto">
            <Button size="sm" variant="secondary">Analytics</Button>
          </Link>
        </div>
        <div className="flex gap-2 mb-4">
          <select value={rating} onChange={(e) => setRating(e.target.value)} className="border rounded p-1 text-sm">
            <option value="all">All ratings</option>
            {[5,4,3,2,1].map((n)=> <option key={n} value={n}>{n}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="border rounded p-1 text-sm">
            <option value="date">Sort by date</option>
            <option value="rating">Sort by rating</option>
          </select>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Feedback List ({items.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <EmptyState icon="⚠️" title="โหลดข้อมูลไม่สำเร็จ" />
            ) : items.length === 0 ? (
              <EmptyState icon="💬" title="No feedback" />
            ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill ID</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Public</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell>{f.billId}</TableCell>
                    <TableCell>{f.rating}</TableCell>
                    <TableCell>{f.message}</TableCell>
                    <TableCell>{new Date(f.timestamp).toLocaleDateString()}</TableCell>
                    <TableCell>{f.public ? 'yes' : 'no'}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link href={`/admin/reviews/${f.id}`}> <Button size="sm">View</Button></Link>
                      <Button size="sm" variant="outline" onClick={() => togglePublic(f.id, !f.public)}>
                        {f.public ? 'Hide' : 'Show'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
