"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/buttons/button'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { toast } from 'sonner'
import { mockBills, markReminderSent } from '@/lib/mock-bills'
import { syncKerryStatuses } from '@/lib/kerryApi'
import { mockNotificationService } from '@/lib/mock-notification-service'
import { addNotification } from '@/lib/mock-notifications'

export default function ShippingDashboard() {
  const [bills, setBills] = useState(() => mockBills.map(b => ({ ...b })))

  const handleSync = async () => {
    const res = await syncKerryStatuses(bills as any)
    setBills(mockBills.map(b => ({ ...b })))
    toast.success(`สำเร็จ ${res.success} ไม่พบเลข ${res.missing} ล้มเหลว ${res.failed}`)
  }

  const handleRemind = async (id: string) => {
    const bill = mockBills.find(b => b.id === id)
    if (!bill) return
    await mockNotificationService.sendNotification({
      type: 'order_updated',
      recipient: { phone: bill.phone },
      data: { billId: id },
      priority: 'normal',
    })
    addNotification({
      id: `remind-${id}-${Date.now()}`,
      type: 'order',
      message: `ติดตามพัสดุสำหรับบิล ${id}`,
      link: `/admin/bill/${id}`,
    })
    markReminderSent(id)
    setBills(mockBills.map(b => ({ ...b })))
    toast.success('ส่งแจ้งเตือนแล้ว')
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
            <TableHead>แจ้งเตือนแล้วหรือยัง</TableHead>
            <TableHead />
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
              <TableCell>{b.reminderSent ? '✅' : '❌'}</TableCell>
              <TableCell>
                <Button size="sm" onClick={() => handleRemind(b.id)}>ส่งแจ้งเตือนทันที</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
