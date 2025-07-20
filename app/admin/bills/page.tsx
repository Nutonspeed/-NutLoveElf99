"use client"
import { useState, useEffect } from 'react'
import { Plus, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Button } from '@/components/ui/buttons/button'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogFooter, DialogHeader as DHeader, DialogTitle, DialogTrigger } from '@/components/ui/modals/dialog'
import { Input } from '@/components/ui/inputs/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BillItemActions from '@/components/admin/BillItemActions'
import type { AdminBill, BillItem } from '@/mock/bills'
import { useBillStore } from '@/core/store'
import { toast } from 'sonner'

export default function AdminBillsPage() {
  const store = useBillStore()
  const [bills, setBills] = useState<AdminBill[]>(store.bills)

  useEffect(() => {
    store.refresh()
    setBills([...store.bills])
  }, [])
  const [open, setOpen] = useState(false)
  const [customer, setCustomer] = useState('')
  const [items, setItems] = useState<BillItem[]>([])
  const [shipping, setShipping] = useState(50)
  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0)
  const total = subtotal + shipping
  const [note, setNote] = useState('')
  const [edit, setEdit] = useState<string | null>(null)
  const [editData, setEditData] = useState<{
    customer: string
    items: BillItem[]
    shipping: number
    note: string
  } | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'unpaid' | 'paid' | 'shipped' | 'cancelled'>('all')
  const [tagFilter, setTagFilter] = useState('all')
  const allTags = Array.from(new Set(bills.flatMap((b) => b.tags)))

  const handleCreate = () => {
    if (items.length === 0) {
      toast.error('ต้องมีสินค้าอย่างน้อย 1 รายการ')
      return
    }
    store.addBill({ customer, items, shipping, note, tags: [] } as any)
    setBills([...store.bills])
    setCustomer('')
    setItems([])
    setNote('')
    setShipping(50)
    setOpen(false)
  }

  const getStatusClass = (status: AdminBill['status']) => {
    if (status === 'paid') return 'bg-green-500 text-white'
    if (status === 'cancelled') return 'bg-red-500 text-white'
    if (status === 'shipped') return 'bg-purple-500 text-white'
    if (status === 'pending') return 'bg-blue-500 text-white'
    return 'bg-yellow-500 text-white'
  }

  const getStatusText = (status: AdminBill['status']) => {
    if (status === 'paid') return 'ชำระแล้ว'
    if (status === 'cancelled') return 'ยกเลิก'
    if (status === 'shipped') return 'จัดส่งแล้ว'
    if (status === 'pending') return 'รอตรวจสอบ'
    return 'รอชำระ'
  }

  const filteredBills = bills
    .filter(
      (b) =>
        b.customer.toLowerCase().includes(search.toLowerCase()) ||
        b.id.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((b) => (statusFilter === 'all' ? true : b.status === statusFilter))
    .filter((b) => (tagFilter === 'all' ? true : b.tags.includes(tagFilter)))

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
              <Textarea placeholder="หมายเหตุ" value={note} onChange={(e) => setNote(e.target.value)} />
              <div className="space-y-2">
                {items.map((it, idx) => (
                  <div key={idx} className="flex space-x-2 items-end">
                    <Input
                      placeholder="สินค้า"
                      value={it.name}
                      onChange={(e) =>
                        setItems(
                          items.map((item, i) =>
                            i === idx ? { ...item, name: e.target.value } : item,
                          ),
                        )
                      }
                    />
                    <Input
                      type="number"
                      className="w-20"
                      value={it.quantity}
                      onChange={(e) =>
                        setItems(
                          items.map((item, i) =>
                            i === idx
                              ? { ...item, quantity: parseInt(e.target.value) || 1 }
                              : item,
                          ),
                        )
                      }
                    />
                    <Input
                      type="number"
                      className="w-24"
                      value={it.price}
                      onChange={(e) =>
                        setItems(
                          items.map((item, i) =>
                            i === idx
                              ? { ...item, price: parseFloat(e.target.value) || 0 }
                              : item,
                          ),
                        )
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setItems(items.filter((_, i) => i !== idx))}
                    >
                      ×
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setItems([...items, { name: '', quantity: 1, price: 0 }])}
                >
                  เพิ่มสินค้า
                </Button>
              </div>
              <div className="space-y-2 pt-2 border-t">
                <div className="flex justify-between">
                  <span>ยอดสินค้า</span>
                  <span>฿{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>ค่าจัดส่ง</span>
                  <Input
                    type="number"
                    className="w-24"
                    value={shipping}
                    onChange={(e) => setShipping(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="flex justify-between font-semibold">
                  <span>ยอดรวม</span>
                  <span>฿{total.toLocaleString()}</span>
                </div>
              </div>
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
              <Select value={tagFilter} onValueChange={setTagFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="mt-4">
            <TabsList>
              <TabsTrigger value="all">ทั้งหมด</TabsTrigger>
              <TabsTrigger value="pending">รอตรวจสอบ</TabsTrigger>
              <TabsTrigger value="unpaid">รอชำระ</TabsTrigger>
              <TabsTrigger value="paid">ชำระแล้ว</TabsTrigger>
              <TabsTrigger value="shipped">จัดส่งแล้ว</TabsTrigger>
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
                  <TableHead>แท็ก</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>วันที่</TableHead>
                  <TableHead className="w-24" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.map((b) => (
                  <TableRow key={b.id}>
                  <TableCell>{b.id}</TableCell>
                  <TableCell>{b.customer}</TableCell>
                  <TableCell className="space-x-1">
                    {b.tags.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={b.status}
                      onValueChange={(v) => {
                        store.updateStatus(b.id, v as AdminBill['status'])
                        setBills([...store.bills])
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
                          <SelectItem value="shipped">จัดส่งแล้ว</SelectItem>
                          <SelectItem value="cancelled">ยกเลิก</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{new Date(b.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <BillItemActions
                        bill={b}
                        onEdit={() => {
                          setEdit(b.id)
                          setEditData({
                            customer: b.customer,
                            items: b.items,
                            shipping: b.shipping,
                            note: b.note,
                          })
                        }}
                      />
                    </TableCell>
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
      <Dialog open={!!edit} onOpenChange={() => setEdit(null)}>
        <DialogContent className="max-w-lg">
          <DHeader>
            <DialogTitle>แก้ไขบิล</DialogTitle>
          </DHeader>
          {editData && (
            <div className="space-y-4">
              <Input
                placeholder="ชื่อลูกค้า"
                value={editData.customer}
                onChange={(e) =>
                  setEditData({ ...editData, customer: e.target.value })
                }
              />
              <div className="space-y-2">
                {editData.items.map((it, idx) => (
                  <div key={idx} className="flex space-x-2 items-end">
                    <Input
                      placeholder="สินค้า"
                      value={it.name}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          items: editData.items.map((item, i) =>
                            i === idx ? { ...item, name: e.target.value } : item,
                          ),
                        })
                      }
                    />
                    <Input
                      type="number"
                      className="w-20"
                      value={it.quantity}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          items: editData.items.map((item, i) =>
                            i === idx
                              ? { ...item, quantity: parseInt(e.target.value) || 1 }
                              : item,
                          ),
                        })
                      }
                    />
                    <Input
                      type="number"
                      className="w-24"
                      value={it.price}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          items: editData.items.map((item, i) =>
                            i === idx
                              ? { ...item, price: parseFloat(e.target.value) || 0 }
                              : item,
                          ),
                        })
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setEditData({
                          ...editData,
                          items: editData.items.filter((_, i) => i !== idx),
                        })
                      }
                    >
                      ×
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setEditData({
                      ...editData,
                      items: [...editData.items, { name: '', quantity: 1, price: 0 }],
                    })
                  }
                >
                  เพิ่มสินค้า
                </Button>
              </div>
              <div className="space-y-2 pt-2 border-t">
                <div className="flex justify-between">
                  <span>ยอดสินค้า</span>
                  <span>
                    ฿{editData.items.reduce((s, it) => s + it.price * it.quantity, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>ค่าจัดส่ง</span>
                  <Input
                    type="number"
                    className="w-24"
                    value={editData.shipping}
                    onChange={(e) =>
                      setEditData({ ...editData, shipping: parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
                <Textarea
                  placeholder="หมายเหตุ"
                  value={editData.note}
                  onChange={(e) => setEditData({ ...editData, note: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() => {
                if (edit && editData) {
                  store.updateBill(edit, editData)
                  setBills([...store.bills])
                  toast.success('บันทึกแล้ว (mock)')
                }
                setEdit(null)
              }}
            >
              บันทึก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
