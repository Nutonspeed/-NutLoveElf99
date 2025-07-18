"use client"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { addDiscountCode, discountCodes, toggleDiscountCode } from '@/lib/mock-discount-codes'

export default function DiscountManagerPage() {
  const [codes, setCodes] = useState([...discountCodes])
  const [form, setForm] = useState({ code: '', type: 'percent', amount: 0, expires: '' })

  const create = () => {
    if (!form.code || !form.expires) return
    const newCode = addDiscountCode({ ...form, active: true })
    setCodes([...codes, newCode])
    setForm({ code: '', type: 'percent', amount: 0, expires: '' })
  }

  const toggle = (id: string) => {
    toggleDiscountCode(id)
    setCodes([...discountCodes])
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">จัดการโค้ดส่วนลด</h1>
      <Card>
        <CardHeader>
          <CardTitle>สร้างโค้ดใหม่</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-4">
          <Input placeholder="CODE" value={form.code} onChange={e=>setForm({ ...form, code: e.target.value.toUpperCase() })} />
          <select className="border rounded p-2" value={form.type} onChange={e=>setForm({ ...form, type:e.target.value })}>
            <option value="percent">เปอร์เซ็นต์</option>
            <option value="fixed">จำนวนเงิน</option>
          </select>
          <Input type="number" placeholder="ส่วนลด" value={form.amount} onChange={e=>setForm({ ...form, amount:Number(e.target.value) })} />
          <Input type="date" value={form.expires} onChange={e=>setForm({ ...form, expires:e.target.value })} />
          <div className="col-span-4 flex justify-end">
            <Button onClick={create}>บันทึก</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>โค้ดส่วนลด</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>โค้ด</TableHead>
                <TableHead>ประเภท</TableHead>
                <TableHead>มูลค่า</TableHead>
                <TableHead>หมดอายุ</TableHead>
                <TableHead>เปิดใช้</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {codes.map(c => (
                <TableRow key={c.id}>
                  <TableCell>{c.code}</TableCell>
                  <TableCell>{c.type}</TableCell>
                  <TableCell>{c.type==='percent'? `${c.amount}%`:`฿${c.amount}`}</TableCell>
                  <TableCell>{c.expires}</TableCell>
                  <TableCell>
                    <Switch checked={c.active} onCheckedChange={()=>toggle(c.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
