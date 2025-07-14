"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { addQuickBill } from "@/lib/mock-quick-bills"

interface Item {
  name: string
  qty: number
  price: number
}

export default function AdminOpenBillQuick() {
  const router = useRouter()
  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [note, setNote] = useState("")
  const [items, setItems] = useState<Item[]>([{ name: "", qty: 1, price: 0 }])

  const addItem = () => setItems([...items, { name: "", qty: 1, price: 0 }])
  const updateItem = (index: number, field: keyof Item, value: string) => {
    setItems(items.map((it, i) => (i === index ? { ...it, [field]: field === "name" ? value : Number(value) } : it)))
  }

  const save = () => {
    const id = "ORDER-" + Math.random().toString(36).slice(2, 8).toUpperCase()
    addQuickBill({ id, customerName, phone, note, items })
    router.push(`/admin/orders/${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold">เปิดบิลแบบรวดเร็ว</h1>
        <Card className="p-4 border">
          <CardHeader>
            <CardTitle>ข้อมูลลูกค้า</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Input className="w-full" placeholder="ชื่อลูกค้า" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            <Input className="w-full" placeholder="เบอร์ติดต่อ" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input className="w-full" placeholder="หมายเหตุ" value={note} onChange={(e) => setNote(e.target.value)} />
          </CardContent>
        </Card>
        <Card className="p-4 border">
          <CardHeader>
            <CardTitle>รายการสินค้า</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อสินค้า</TableHead>
                  <TableHead>จำนวน</TableHead>
                  <TableHead>ราคา</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Input className="w-full" value={item.name} onChange={(e) => updateItem(idx, "name", e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <Input className="w-full" type="number" value={item.qty} onChange={(e) => updateItem(idx, "qty", e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <Input className="w-full" type="number" value={item.price} onChange={(e) => updateItem(idx, "price", e.target.value)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant="outline" className="mt-2" onClick={addItem}>เพิ่มสินค้าใหม่</Button>
          </CardContent>
        </Card>
        <Button className="fixed bottom-4 left-4 right-4" onClick={save}>บันทึกบิล</Button>
      </div>
    </div>
  )
}
