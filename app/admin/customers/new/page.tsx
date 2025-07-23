"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Textarea } from "@/components/ui/textarea"

export default function AdminCustomersNewPage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [note, setNote] = useState("")

  const disabled = !name.trim() || !phone.trim() || !address.trim()

  const handleSave = () => {
    console.log({ name, phone, address, note })
    alert("บันทึกลูกค้าแล้ว (demo)")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/customers">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">เพิ่มลูกค้าใหม่</h1>
        </div>
        <Card className="border">
          <CardHeader>
            <CardTitle>ข้อมูลลูกค้า</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="ชื่อ" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="เบอร์โทร" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Textarea placeholder="ที่อยู่" value={address} onChange={(e) => setAddress(e.target.value)} />
            <Textarea placeholder="หมายเหตุ" value={note} onChange={(e) => setNote(e.target.value)} />
          </CardContent>
        </Card>
        <Button className="w-full" onClick={handleSave} disabled={disabled}>
          บันทึกลูกค้า
        </Button>
      </div>
    </div>
  )
}
