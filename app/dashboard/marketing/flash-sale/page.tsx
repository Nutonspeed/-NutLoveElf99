"use client"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { mockProducts } from '@/lib/mock-products'
import { addFlashSale, flashSales, removeFlashSale } from '@/lib/mock-flash-sales'

export default function FlashSalePage() {
  const [sales, setSales] = useState([...flashSales])
  const [form, setForm] = useState({ productId: mockProducts[0].id, price: 0, start: '', end: '' })

  const create = () => {
    if (!form.start || !form.end) return
    const fs = addFlashSale(form)
    setSales([...sales, fs])
    setForm({ productId: mockProducts[0].id, price: 0, start: '', end: '' })
  }

  const remove = (id: string) => {
    removeFlashSale(id)
    setSales([...flashSales])
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">Flash Sale Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Create Flash Sale</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-4">
          <select className="border rounded p-2" value={form.productId} onChange={e=>setForm({ ...form, productId:e.target.value })}>
            {mockProducts.map(p=> (<option key={p.id} value={p.id}>{p.name}</option>))}
          </select>
          <Input type="number" placeholder="ราคาพิเศษ" value={form.price} onChange={e=>setForm({ ...form, price:Number(e.target.value) })} />
          <Input type="datetime-local" value={form.start} onChange={e=>setForm({ ...form, start:e.target.value })} />
          <Input type="datetime-local" value={form.end} onChange={e=>setForm({ ...form, end:e.target.value })} />
          <div className="col-span-4 flex justify-end">
            <Button onClick={create}>บันทึก</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>รายการ Flash Sale</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>สินค้า</TableHead>
                <TableHead>ราคา</TableHead>
                <TableHead>เริ่ม</TableHead>
                <TableHead>สิ้นสุด</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map(s => (
                <TableRow key={s.id}>
                  <TableCell>{mockProducts.find(p=>p.id===s.productId)?.name}</TableCell>
                  <TableCell>฿{s.price}</TableCell>
                  <TableCell>{s.start}</TableCell>
                  <TableCell>{s.end}</TableCell>
                  <TableCell className="text-right"><Button variant="outline" size="sm" onClick={()=>remove(s.id)}>ลบ</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
