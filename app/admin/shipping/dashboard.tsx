"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/buttons/button'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { toast } from 'sonner'
import { mockBills } from '@/lib/mock-bills'
import { syncKerryStatuses } from '@/lib/kerryApi'

export default function ShippingDashboard() {
  const [bills, setBills] = useState(() => mockBills.map(b => ({ ...b })))

  const handleSync = async () => {
    const res = await syncKerryStatuses(bills as any)
    setBills(mockBills.map(b => ({ ...b })))
    toast.success(`สำเร็จ ${res.success} ไม่พบเลข ${res.missing} ล้มเหลว ${res.failed}`)
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Shipping Dashboard</h1>
        <Button onClick={handleSync}>เช็คสถานะ Kerry Express</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Tracking</TableHead>
            <TableHead>Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map(b => (
            <TableRow key={b.id}>
              <TableCell>{b.id}</TableCell>
              <TableCell>
                {b.shippingMethod === 'kerry' && (
                  <span className="mr-1 inline-block">🚚</span>
                )}
                {b.shippingMethod || '-'}
              </TableCell>
              <TableCell>{(b as any).tracking_number || '-'}</TableCell>
              <TableCell className="space-x-1">
                {b.tags.map(t => (
                  <span key={t} className="rounded bg-muted px-2 py-0.5 text-xs">
                    {t}
                  </span>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
