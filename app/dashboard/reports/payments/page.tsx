"use client"
import { useEffect, useState } from 'react'
import { getPayments, type Payment } from '@/lib/mock/payment'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import EmptyState from '@/components/EmptyState'

export default function PaymentReportPage() {
  const [list, setList] = useState<Payment[]>([])
  const [status, setStatus] = useState('all')

  useEffect(() => {
    setList([...getPayments()])
  }, [])

  const filtered = list.filter(p => status === 'all' || (status === 'verified' ? p.verified : !p.verified))

  if (list.length === 0) return <EmptyState title="ไม่มีข้อมูล" />

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">ประวัติการชำระเงิน</h1>
      <select className="border rounded p-2" value={status} onChange={e=>setStatus(e.target.value)}>
        <option value="all">ทั้งหมด</option>
        <option value="verified">ยืนยันแล้ว</option>
        <option value="pending">รอตรวจสอบ</option>
      </select>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>จำนวน</TableHead>
            <TableHead>ช่องทาง</TableHead>
            <TableHead>สถานะ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map(p => (
            <TableRow key={p.orderId}>
              <TableCell>{p.orderId}</TableCell>
              <TableCell>฿{p.amount.toLocaleString()}</TableCell>
              <TableCell>{p.method}</TableCell>
              <TableCell>{p.verified ? 'ยืนยันแล้ว' : 'รอตรวจสอบ'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
