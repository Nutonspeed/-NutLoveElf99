"use client"
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/inputs/input'
import { Button } from '@/components/ui/buttons/button'
import { getReviews, toggleHide, type Review } from '@/core/mock/store'

export default function ReviewManagerPage() {
  const [list, setList] = useState<Review[]>([])
  const [rating, setRating] = useState(0)
  const [q, setQ] = useState('')

  useEffect(() => {
    setList([...getReviews()])
  }, [])

  const filtered = list.filter(r => (rating === 0 || r.rating === rating) &&
    (q === '' || r.comment.includes(q) || (r.customer && r.customer.includes(q))))

  const toggle = (id: string) => {
    toggleHide(id)
    setList([...getReviews()])
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">จัดการรีวิว</h1>
      <div className="flex gap-2">
        <select className="border rounded p-2" value={rating} onChange={e=>setRating(parseInt(e.target.value))}>
          <option value={0}>ทุกคะแนน</option>
          {[1,2,3,4,5].map(n=> <option key={n} value={n}>{n} ดาว</option>)}
        </select>
        <Input placeholder="ค้นหา" value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      {filtered.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ออเดอร์</TableHead>
              <TableHead>คะแนน</TableHead>
              <TableHead>ข้อความ</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(r=> (
              <TableRow key={r.orderId} className={r.hidden ? 'opacity-50' : ''}>
                <TableCell>{r.orderId}</TableCell>
                <TableCell>{r.rating}</TableCell>
                <TableCell>{r.comment}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={()=>toggle(r.orderId)}>
                    {r.hidden ? 'แสดง' : 'ซ่อน'}
                  </Button>
                  <Button size="sm" onClick={()=>alert('report (mock)')}>แจ้งเตือน</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
