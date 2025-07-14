"use client"
import { useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/inputs/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/modals/dialog"
import { addFastBill } from "@/lib/mock-fast-bills"

export default function AdminFastBillPage() {
  const [customer, setCustomer] = useState("")
  const [items, setItems] = useState("")
  const [total, setTotal] = useState(0)
  const [phone, setPhone] = useState("")
  const [deposit, setDeposit] = useState(0)
  const [days, setDays] = useState(10)
  const [billLink, setBillLink] = useState<string | null>(null)

  const remaining = total && total > deposit ? total - deposit : 0

  const create = () => {
    const bill = addFastBill({
      customerName: customer,
      phone,
      items,
      total,
      deposit,
      days: days > 0 ? days : 10,
    })
    setBillLink(`/b/${bill.id}`)
  }

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
      </div>
    </div>
  )
}
