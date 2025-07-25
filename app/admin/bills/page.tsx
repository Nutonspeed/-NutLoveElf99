"use client"
import { useState } from 'react'
import Link from 'next/link'
import { Table, TableHeader, TableHead, TableRow, TableBody } from '@/components/ui/table'
import { Input } from '@/components/ui/inputs/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import BillRow from '@/components/admin/bills/BillRow'
import { useBillStore } from '@/core/store'

export default function AdminBillsPage() {
  const store = useBillStore()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<'all' | 'paid' | 'unpaid' | 'cancelled'>('all')

  const bills = store.bills
    .filter(b => b.customer.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase()))
    .filter(b => status === 'all' ? true : b.status === status)

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex flex-wrap items-end gap-2">
        <Input placeholder="ค้นหาบิล" value={search} onChange={e => setSearch(e.target.value)} className="w-48" />
        <Select value={status} onValueChange={v => setStatus(v as any)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="สถานะ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทั้งหมด</SelectItem>
            <SelectItem value="paid">ชำระแล้ว</SelectItem>
            <SelectItem value="unpaid">ค้างจ่าย</SelectItem>
            <SelectItem value="cancelled">ยกเลิก</SelectItem>
          </SelectContent>
        </Select>
        <Link href="/admin/bill/create" className="ml-auto text-blue-600 underline">สร้างบิลใหม่</Link>
      </div>
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>รหัส</TableHead>
            <TableHead>ลูกค้า</TableHead>
            <TableHead className="text-right">ยอด</TableHead>
            <TableHead>สถานะ</TableHead>
            <TableHead>จัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map(b => (
            <BillRow key={b.id} bill={b} selected={false} onSelect={() => {}} onEdit={() => {}} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
