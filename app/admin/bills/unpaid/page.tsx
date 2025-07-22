"use client"
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { useBillStore } from '@/core/store'
import { formatCurrency, formatDateThai } from '@/lib/utils'
import { toast } from 'sonner'

export default function UnpaidBillsPage() {
  const store = useBillStore()
  const [bills, setBills] = useState(store.bills)

  useEffect(() => {
    store.refresh()
    setBills([...store.bills])
  }, [])

  const sendFollowup = async (id: string) => {
    await fetch('/api/notify/followup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ billId: id }),
    })
    store.refresh()
    setBills([...store.bills])
    toast.success('บันทึกการติดตามแล้ว')
  }

  const unpaid = bills.filter(b => b.status === 'unpaid')

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">บิลค้างจ่าย</h1>
      <Card>
        <CardHeader>
          <CardTitle>รายการ ({unpaid.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ชื่อลูกค้า</TableHead>
                <TableHead>วันที่</TableHead>
                <TableHead className="text-right">ยอดรวม</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className="w-32" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {unpaid.map(b => {
                const total = b.items.reduce((s, it) => s + it.price * it.quantity, 0) + b.shipping
                const last = b.followup_log?.[b.followup_log.length - 1]
                return (
                  <TableRow key={b.id}>
                    <TableCell>{b.customer}</TableCell>
                    <TableCell>{formatDateThai(b.createdAt)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(total)}</TableCell>
                    <TableCell>{last ? formatDateThai(last) : '-'}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => sendFollowup(b.id)}>
                        ติดตาม ({b.followup_log?.length || 0})
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          {unpaid.length === 0 && <p className="text-center py-4 text-sm">ไม่มีบิลค้างจ่าย</p>}
        </CardContent>
      </Card>
    </div>
  )
}
