"use client"
import { useEffect, useState } from 'react'
import { useBillStore } from '@/core/store'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/button'
import BillStatusTag from '@/components/admin/bills/BillStatusTag'
import { formatDateThai } from '@/lib/formatDateThai'

function escapeCSV(v: string | number | undefined) {
  const s = v === undefined || v === null ? '' : String(v)
  return '"' + s.replace(/"/g, '""') + '"'
}

export default function UnshippedBillsPage() {
  const store = useBillStore()
  const [bills, setBills] = useState(store.bills)

  useEffect(() => {
    store.refresh()
    setBills([...store.bills])
  }, [])

  const unshipped = bills.filter(b => b.status !== 'shipped')

  const markShipped = (id: string) => {
    store.updateStatus(id, 'shipped')
    setBills([...store.bills])
  }

  const exportList = () => {
    const header = ['วันที่', 'ชื่อลูกค้า', 'ที่อยู่', 'เบอร์', 'รายการ', 'หมายเหตุ']
    const rows = unshipped.map(b => {
      const items = b.items.map(it => `${it.name} x${it.quantity}`).join('; ')
      const addr = (b as any).address ?? '-'
      const phone = (b as any).phone ?? '-'
      return [formatDateThai(b.createdAt), b.customer, addr, phone, items, b.note]
    })
    const csv = [header, ...rows].map(r => r.map(escapeCSV).join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'packing.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">ยังไม่จัดส่ง</h1>
        {unshipped.length > 0 && (
          <div className="flex gap-2">
            <Button onClick={exportList}>Export รายการจัดส่ง</Button>
            <Link
              href={`/admin/bills/print-labels?ids=${unshipped.map(b => b.id).join(',')}`}
            >
              <Button variant="outline">พิมพ์ใบปะหน้าทั้งหมด</Button>
            </Link>
          </div>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>วันที่</TableHead>
            <TableHead>ลูกค้า</TableHead>
            <TableHead>รายการ</TableHead>
            <TableHead>สถานะ</TableHead>
            <TableHead>หมายเหตุ</TableHead>
            <TableHead className="w-32" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {unshipped.map(b => (
            <TableRow key={b.id}>
              <TableCell>{formatDateThai(b.createdAt)}</TableCell>
              <TableCell>{b.customer}</TableCell>
              <TableCell className="max-w-[12rem] truncate">
                {b.items.map(it => `${it.name} x${it.quantity}`).join(', ')}
              </TableCell>
              <TableCell><BillStatusTag status={b.status} /></TableCell>
              <TableCell className="max-w-[8rem] truncate">{b.note}</TableCell>
              <TableCell>
                <Button size="sm" onClick={() => markShipped(b.id)}>
                  จัดส่งแล้ว
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {unshipped.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                ไม่มีบิลคงค้าง
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

