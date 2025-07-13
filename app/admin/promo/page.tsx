"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockCustomers } from "@/lib/mock-customers"
import { createPromo, deletePromo, listPromos, type Promo } from "@/lib/mock-promos"

export default function AdminPromoPage() {
  const [promos, setPromos] = useState<Promo[]>(listPromos())
  const [code, setCode] = useState("")
  const [customerId, setCustomerId] = useState("2")

  const handleCreate = () => {
    if (!code) return
    createPromo(code, customerId)
    setPromos(listPromos())
    setCode("")
  }

  const handleDelete = (id: string) => {
    deletePromo(id)
    setPromos(listPromos())
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">โปรโมชันเฉพาะกลุ่ม</h1>
        </div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>สร้างโปรโมชัน</CardTitle>
          </CardHeader>
          <CardContent className="flex space-x-2">
            <Input
              placeholder="CODE"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
            />
            <select
              className="border px-2 py-1 rounded"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            >
              {mockCustomers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <Button onClick={handleCreate}>สร้าง</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>รายการโปรโมชัน</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>โค้ด</TableHead>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>ลิงก์</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promos.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.code}</TableCell>
                    <TableCell>{mockCustomers.find((c) => c.id === p.customerId)?.name}</TableCell>
                    <TableCell>
                      <Link href={`/promo/${p.code}`}>{`/promo/${p.code}`}</Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="icon" onClick={() => handleDelete(p.id)}>
                        ลบ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {promos.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500">
                      ไม่มีข้อมูล
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
