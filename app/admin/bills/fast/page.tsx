"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/inputs/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/modals/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import EmptyState from "@/components/ui/EmptyState"
import type { FastBill } from "@/lib/mock-fast-bills"

export default function AdminFastBillPage() {
  const [customer, setCustomer] = useState("")
  const [items, setItems] = useState("")
  const [total, setTotal] = useState(0)
  const [phone, setPhone] = useState("")
  const [deposit, setDeposit] = useState(0)
  const [days, setDays] = useState(10)
  const [fabricName, setFabricName] = useState("")
  const [fabricImage, setFabricImage] = useState("")
  const [sofaType, setSofaType] = useState("")
  const [sofaSize, setSofaSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [tags, setTags] = useState<string[]>([])
  const [billLink, setBillLink] = useState<string | null>(null)
  const [bills, setBills] = useState<FastBill[]>([])
  const [search, setSearch] = useState("")
  const [fabricFilter, setFabricFilter] = useState("all")
  const [sofaFilter, setSofaFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  const remaining = total && total > deposit ? total - deposit : 0

  useEffect(() => {
    fetch("/api/bills/fast")
      .then(r => r.json())
      .then(setBills)
      .finally(() => setLoading(false))
  }, [])

  const create = async () => {
    const res = await fetch("/api/bills/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: customer,
        phone,
        items,
        total,
        deposit,
        days: days > 0 ? days : 10,
        fabricName,
        fabricImage,
        sofaType,
        sofaSize,
        quantity,
        tags,
      }),
    })
    if (res.ok) {
      const bill: FastBill = await res.json()
      setBills([bill, ...bills])
      setBillLink(`/b/${bill.id}`)
    }
  }

  const fabricOptions = Array.from(new Set(bills.map(b => b.fabricName)))
  const sofaOptions = Array.from(new Set(bills.map(b => b.sofaType)))

  const filtered = bills
    .filter(b =>
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()),
    )
    .filter(b => (fabricFilter === "all" ? true : b.fabricName === fabricFilter))
    .filter(b => (sofaFilter === "all" ? true : b.sofaType === sofaFilter))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold">Fast Bill</h1>
        <Card>
          <CardHeader>
            <CardTitle>ข้อมูลบิล</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Input placeholder="ชื่อลูกค้า" value={customer} onChange={(e) => setCustomer(e.target.value)} />
            <Textarea placeholder="รายการสินค้า" value={items} onChange={(e) => setItems(e.target.value)} />
            <Input type="number" placeholder="ยอดรวม" value={total} onChange={(e) => setTotal(Number(e.target.value))} />
            <Input placeholder="เบอร์โทร" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input placeholder="ชื่อผ้า" value={fabricName} onChange={(e) => setFabricName(e.target.value)} />
            <Input placeholder="ลิงก์รูปผ้า" value={fabricImage} onChange={(e) => setFabricImage(e.target.value)} />
            <Input placeholder="ประเภทโซฟา" value={sofaType} onChange={(e) => setSofaType(e.target.value)} />
            <Input placeholder="ขนาดโซฟา" value={sofaSize} onChange={(e) => setSofaSize(e.target.value)} />
            <Input type="number" placeholder="จำนวนชุด" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            <div className="flex space-x-2">
              {['ด่วน','สีพิเศษ','จัดส่งวันนี้'].map(t => (
                <label key={t} className="flex items-center space-x-1 text-sm">
                  <Checkbox checked={tags.includes(t)} onCheckedChange={() => setTags(tags.includes(t) ? tags.filter(x => x!==t) : [...tags,t])} />
                  <span>{t}</span>
                </label>
              ))}
            </div>
            <Input type="number" placeholder="ยอดมัดจำ" value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} />
            {total > 0 && (
              <p className="text-sm text-gray-600">ยอดคงเหลือ {remaining.toLocaleString()} บาท</p>
            )}
            <Input type="number" placeholder="ระยะเวลาทำสินค้า (วัน)" value={days} onChange={(e) => setDays(Math.max(1, Number(e.target.value)))} />
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" onClick={create} disabled={!items.trim()}>สร้างบิลและส่งให้ลูกค้า</Button>
              </DialogTrigger>
              {billLink && (
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>ลิงก์บิล</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2 text-center">
                    <img src="/placeholder.svg" alt="QR" className="mx-auto w-40 h-40" />
                    <p>{billLink}</p>
                    <Button variant="outline" onClick={() => navigator.clipboard.writeText(window.location.origin + billLink!)}>
                      คัดลอกลิงก์
                    </Button>
                  </div>
                </DialogContent>
              )}
            </Dialog>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>รายการบิลด่วน</CardTitle>
          </CardHeader>
          <CardContent>
            <Input placeholder="ค้นหา" value={search} onChange={(e) => setSearch(e.target.value)} className="mb-4" />
            <div className="flex space-x-2 mb-4">
              <Select value={fabricFilter} onValueChange={setFabricFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="ผ้า" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  {fabricOptions.map(f => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sofaFilter} onValueChange={setSofaFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="โซฟา" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  {sofaOptions.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : filtered.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>เลขบิล</TableHead>
                    <TableHead>ชื่อลูกค้า</TableHead>
                    <TableHead>ผ้า</TableHead>
                    <TableHead>โซฟา</TableHead>
                    <TableHead>จำนวน</TableHead>
                    <TableHead>ยอดรวม</TableHead>
                    <TableHead>แท็ก</TableHead>
                    <TableHead>วันที่</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(b => (
                    <TableRow key={b.id}>
                      <TableCell>{b.id}</TableCell>
                      <TableCell>{b.customerName}</TableCell>
                      <TableCell className="flex items-center space-x-2">
                        {b.fabricImage && (
                          <img src={b.fabricImage} alt="fabric" className="w-12 h-12 object-cover rounded" />
                        )}
                        <span>{b.fabricName}</span>
                      </TableCell>
                      <TableCell>{b.sofaType} {b.sofaSize}</TableCell>
                      <TableCell>{b.quantity}</TableCell>
                      <TableCell>{b.total.toLocaleString()}</TableCell>
                      <TableCell className="space-x-1">
                        {b.tags.map(t => (
                          <Badge key={t} variant="secondary">{t}</Badge>
                        ))}
                      </TableCell>
                      <TableCell>{new Date(b.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState title="ไม่พบบิล" />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
