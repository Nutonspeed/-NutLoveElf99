"use client"
import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Button } from '@/components/ui/buttons/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogFooter, DialogHeader as DHeader, DialogTitle, DialogTrigger } from '@/components/ui/modals/dialog'
import { Input } from '@/components/ui/inputs/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { AdminBill } from '@/mock/bills'
import { mockBills, addBill, updateBillStatus } from '@/mock/bills'

export default function AdminBillsPage() {
  const [bills, setBills] = useState<AdminBill[]>([...mockBills])
  const [open, setOpen] = useState(false)
  const [customer, setCustomer] = useState('')
  const [items, setItems] = useState('')
  const [note, setNote] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'unpaid' | 'paid' | 'cancelled'>('all')

  const handleCreate = () => {
    const bill = addBill({ customer, items, note })
    setBills([bill, ...bills])
    setCustomer('')
    setItems('')
    setNote('')
    setOpen(false)
  }

  const getStatusClass = (status: AdminBill['status']) => {
    if (status === 'paid') return 'bg-green-500 text-white'
    if (status === 'cancelled') return 'bg-red-500 text-white'
    return 'bg-yellow-500 text-white'
  }

  const getStatusText = (status: AdminBill['status']) => {
    if (status === 'paid') return 'ชำระแล้ว'
    if (status === 'cancelled') return 'ยกเลิก'
    return 'รอชำระ'
  }

  const filteredBills = bills
    .filter(
      (b) =>
        b.customer.toLowerCase().includes(search.toLowerCase()) ||
        b.id.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((b) => (statusFilter === 'all' ? true : b.status === statusFilter))

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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>รายการบิล ({filteredBills.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ค้นหาด้วยชื่อ/เลขบิล"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </div>
          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="mt-4">
            <TabsList>
              <TabsTrigger value="all">ทั้งหมด</TabsTrigger>
              <TabsTrigger value="unpaid">รอชำระ</TabsTrigger>
              <TabsTrigger value="paid">ชำระแล้ว</TabsTrigger>
              <TabsTrigger value="cancelled">ยกเลิก</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          {filteredBills.length ? (
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
                {filteredBills.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>{b.id}</TableCell>
                    <TableCell>{b.customer}</TableCell>
                    <TableCell>
                      <Select
                        value={b.status}
                        onValueChange={(v) => {
                          updateBillStatus(b.id, v as AdminBill['status'])
                          setBills([...mockBills])
                        }}
                      >
                        <SelectTrigger className="w-28">
                          <Badge className={getStatusClass(b.status)}>
                            {getStatusText(b.status)}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unpaid">รอชำระ</SelectItem>
                          <SelectItem value="paid">ชำระแล้ว</SelectItem>
                          <SelectItem value="cancelled">ยกเลิก</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{new Date(b.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center text-muted text-sm">
              {bills.length === 0 ? 'ยังไม่มีบิลในระบบ' : 'ไม่พบบิลที่ค้นหา'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
