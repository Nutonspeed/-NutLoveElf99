"use client"
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Button } from '@/components/ui/buttons/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogFooter, DialogHeader as DHeader, DialogTitle, DialogTrigger } from '@/components/ui/modals/dialog'
import { Input } from '@/components/ui/inputs/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import type { AdminBill } from '@/mock/bills'
import { mockBills, addBill } from '@/mock/bills'

export default function AdminBillsPage() {
  const [bills, setBills] = useState<AdminBill[]>([...mockBills])
  const [open, setOpen] = useState(false)
  const [customer, setCustomer] = useState('')
  const [items, setItems] = useState('')
  const [note, setNote] = useState('')

  const handleCreate = () => {
    const bill = addBill({ customer, items, note })
    setBills([bill, ...bills])
    setCustomer('')
    setItems('')
    setNote('')
    setOpen(false)
  }

  const statusBadge = (status: AdminBill['status']) => {
    if (status === 'paid') return <Badge className="bg-green-500 text-white">ชำระแล้ว</Badge>
    if (status === 'cancelled') return <Badge className="bg-red-500 text-white">ยกเลิก</Badge>
    return <Badge className="bg-yellow-500 text-white">รอชำระ</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">บิล</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              สร้างบิลใหม่
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DHeader>
              <DialogTitle>สร้างบิล</DialogTitle>
            </DHeader>
            <div className="space-y-4">
              <Input placeholder="ชื่อลูกค้า" value={customer} onChange={(e) => setCustomer(e.target.value)} />
              <Textarea placeholder="รายการสินค้า" value={items} onChange={(e) => setItems(e.target.value)} />
              <Textarea placeholder="หมายเหตุ" value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
            <DialogFooter>
              <Button onClick={handleCreate}>บันทึกบิล (mock)</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>รายการบิล</CardTitle>
        </CardHeader>
        <CardContent>
          {bills.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เลขบิล</TableHead>
                  <TableHead>ชื่อลูกค้า</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>วันที่</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bills.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>{b.id}</TableCell>
                    <TableCell>{b.customer}</TableCell>
                    <TableCell>{statusBadge(b.status)}</TableCell>
                    <TableCell>{new Date(b.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center text-muted text-sm">ยังไม่มีบิลในระบบ</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
