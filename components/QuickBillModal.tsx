"use client"
import { useState } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { addQuickBill } from "@/lib/mock-quick-bills"

interface Item {
  name: string
  qty: number
  price: number
}

export default function QuickBillModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [note, setNote] = useState("")
  const [items, setItems] = useState<Item[]>([{ name: "", qty: 1, price: 0 }])

  if (!open) return null

  const addItem = () => setItems([...items, { name: "", qty: 1, price: 0 }])
  const updateItem = (index: number, field: keyof Item, value: string) => {
    setItems(items.map((it, i) => (i === index ? { ...it, [field]: field === "name" ? value : Number(value) } : it)))
  }

  const save = () => {
    const id = "BILL-" + Math.random().toString(36).slice(2, 8).toUpperCase()
    addQuickBill({ id, customerName, phone, note, items })
    alert(`สร้างบิล ${id}`)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 w-full max-w-md space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold text-center">เปิดบิลเร็ว</h2>
        <div className="space-y-2">
          <Input placeholder="ชื่อลูกค้า" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          <Input placeholder="เบอร์ติดต่อ" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Input placeholder="หมายเหตุ" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <div>
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
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>ยกเลิก</Button>
          <Button onClick={save}>บันทึกบิล</Button>
        </div>
      </div>
    </div>
  )
}
