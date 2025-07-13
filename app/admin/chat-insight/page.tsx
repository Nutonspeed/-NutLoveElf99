"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { listChatBills, loadChatBills } from '@/lib/mock-chat-bills'
import { format } from 'date-fns'

export default function ChatInsightPage() {
  const [bills, setBills] = useState(listChatBills())
  useEffect(() => {
    loadChatBills()
    setBills(listChatBills())
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-4">บิลที่สร้างจากแชท</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>วันที่</TableHead>
            <TableHead>ลูกค้า</TableHead>
            <TableHead>สินค้า</TableHead>
            <TableHead>สถานะ</TableHead>
            <TableHead className="w-24"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((b) => (
            <TableRow key={b.billId}>
              <TableCell>{format(new Date(b.createdAt), 'yyyy-MM-dd')}</TableCell>
              <TableCell>{b.fbName}</TableCell>
              <TableCell>{b.items.map((i) => i.name).join(', ')}</TableCell>
              <TableCell>{b.status}</TableCell>
              <TableCell>
                <Link href={`/chat-bill/${b.billId}`}>
                  <Button variant="outline" size="sm">เปิดลิงก์</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
