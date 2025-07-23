"use client"
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Plus, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Button } from '@/components/ui/buttons/button'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogFooter, DialogHeader as DHeader, DialogTitle, DialogTrigger } from '@/components/ui/modals/dialog'
import { Input } from '@/components/ui/inputs/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import EmptyState from '@/components/ui/EmptyState'
import BillRow from '@/components/admin/bills/BillRow'
import { formatCurrency } from '@/lib/utils'
import { sumRevenueByDateRange } from '@/lib/sumRevenueByDateRange'
import { highlightDiff } from '@/lib/highlightDiff'
import { formatDateThai } from '@/lib/formatDateThai'
import { filterBillsByDate } from '@/lib/filterBillsByDate'
import type { AdminBill, BillItem } from '@/mock/bills'
import { useBillStore } from '@/core/store'
import { getBillActivity } from '@/core/mock/store'
import { toast } from 'sonner'

export default function AdminBillsPage() {
  const store = useBillStore()
  const searchParams = useSearchParams()
  const [bills, setBills] = useState<AdminBill[]>(store.bills)

  useEffect(() => {
    try {
      store.refresh()
      setBills([...store.bills])
    } catch (e) {
      setError(true)
    }
  }, [])
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
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
  const [dateFilter, setDateFilter] = useState<'today' | '7d' | 'all'>('today')
  const [tagFilter, setTagFilter] = useState('all')
  const allTags = Array.from(new Set(bills.flatMap((b) => b.tags)))
  const [sortDesc, setSortDesc] = useState(true)
  const [selected, setSelected] = useState<string[]>([])
  const followupSuccess = searchParams.get('filter') === 'followup-success'

  useEffect(() => {
    if (followupSuccess) {
      setStatusFilter('paid')
    }
  }, [followupSuccess])

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  }

  const selectAll = () => setSelected(filteredBills.map((b) => b.id))
  const clearAll = () => setSelected([])

  const handleCreate = () => {
    if (items.length === 0) {
      toast.error('ต้องมีสินค้าอย่างน้อย 1 รายการ')
      return
    }
    store.addBill({
      customer,
      items,
      shipping,
      note,
      tags: [],
      paymentStatus: 'unpaid',
    } as any)
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


  const filteredBills = filterBillsByDate(bills, dateFilter)
    .filter(
      (b) =>
        b.customer.toLowerCase().includes(search.toLowerCase()) ||
        b.id.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((b) => (statusFilter === 'all' ? true : b.status === statusFilter))
    .filter((b) => (tagFilter === 'all' ? true : b.tags.includes(tagFilter)))
    .filter(b => (followupSuccess ? (b.status === 'paid' && (b.followup_log?.length || 0) > 0) : true))
    .sort((a, b) =>
      sortDesc
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )

  const todayTotal = filterBillsByDate(bills, 'today')
    .filter(b => b.status !== 'cancelled')
    .reduce(
      (sum, b) =>
        sum + b.items.reduce((s, it) => s + it.price * it.quantity, 0) + b.shipping,
      0,
    )
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStart = new Date(yesterday.toDateString())
  const yesterdayEnd = new Date(yesterdayStart)
  yesterdayEnd.setDate(yesterdayEnd.getDate() + 1)
  const yesterdayTotal = sumRevenueByDateRange(bills, yesterdayStart, yesterdayEnd)
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - 6)
  const weekTotal = sumRevenueByDateRange(bills, weekStart, new Date())
  const diff = highlightDiff(todayTotal, yesterdayTotal)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold">บิล</h1>
          <p className="text-sm text-muted-foreground">
            ยอดรวม 7 วันล่าสุด: {formatCurrency(weekTotal)}{' '}
            <span className={diff.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
              {diff.trend === 'up' ? '▲' : '▼'} {Math.abs(diff.diff).toFixed(0)}%
            </span>
          </p>
        </div>
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
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="ช่วงเวลา" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">วันนี้</SelectItem>
                  <SelectItem value="7d">7 วันล่าสุด</SelectItem>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                </SelectContent>
              </Select>
              {selected.length > 0 && (
                <Link
                  href={`/admin/bills/label-batch?ids=${selected.join(',')}`}
                  className="no-underline"
                >
                  <Button size="sm">พิมพ์ใบปะหน้าหลายรายการ</Button>
                </Link>
              )}
              {filteredBills.length > 0 && (
                <>
                  <Button variant="outline" size="sm" onClick={selectAll}>
                    เลือกทั้งหมดในหน้า
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearAll}>
                    ยกเลิกเลือกทั้งหมด
                  </Button>
                </>
              )}
            </div>
          </div>
          <Tabs
            value={statusFilter}
            onValueChange={(value) =>
              setStatusFilter(
                value as 'all' | 'pending' | 'unpaid' | 'paid' | 'cancelled'
              )
            }
            className="mt-4"
          >
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
        <CardContent className="overflow-x-auto">
          {error ? (
            <EmptyState icon="⚠️" title="โหลดข้อมูลไม่สำเร็จ" />
          ) : filteredBills.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Checkbox
                      checked={selected.length === filteredBills.length && filteredBills.length > 0}
                      indeterminate={selected.length > 0 && selected.length < filteredBills.length}
                      onCheckedChange={(v) => (v ? selectAll() : clearAll())}
                    />
                  </TableHead>
                  <TableHead>เลขบิล</TableHead>
                  <TableHead>ชื่อลูกค้า</TableHead>
                  <TableHead className="text-right">ยอดรวม</TableHead>
                  <TableHead>ติดต่อ</TableHead>
                  <TableHead>แท็ก</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>Last Follow-up</TableHead>
                  <TableHead
                    className="cursor-pointer select-none"
                    onClick={() => setSortDesc(!sortDesc)}
                  >
                    วันที่ {sortDesc ? '↓' : '↑'}
                  </TableHead>
                  <TableHead className="w-24" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.map((b) => {
                  const paidAt = getBillActivity(b.id).find(a => a.action === 'paid')?.timestamp
                  return (
                    <BillRow
                      key={b.id}
                      bill={b}
                      selected={selected.includes(b.id)}
                      paidDate={paidAt}
                      highlightPayment={followupSuccess}
                      onSelect={() => toggle(b.id)}
                      onStatusChange={(v) => {
                        store.updateStatus(b.id, v)
                        setBills([...store.bills])
                        toast.success('สถานะบิลอัปเดตแล้ว ✅')
                      }}
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
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <EmptyState
              icon="🗒️"
              title={bills.length === 0 ? 'ยังไม่มีบิลในระบบ' : 'ไม่พบบิลที่ค้นหา'}
            />
          )}
          <div className="mt-4 text-right font-semibold">
            ยอดรวมบิลวันนี้: {formatCurrency(todayTotal)}
          </div>
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
