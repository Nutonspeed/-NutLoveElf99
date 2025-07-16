"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { generateCoupons, type Coupon } from "@/lib/mock-coupons"
import { toast } from "sonner"

export default function CouponGeneratorPage() {
  const [prefix, setPrefix] = useState("")
  const [discount, setDiscount] = useState(0)
  const [amount, setAmount] = useState(1)
  const [generated, setGenerated] = useState<Coupon[]>([])

  const handleGenerate = () => {
    try {
      const res = generateCoupons(prefix, discount, amount)
      setGenerated(res)
    } catch (e) {
      toast.error("ยังไม่สามารถสร้างได้")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/coupons">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">สร้างคูปองหลายใบ</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ตั้งค่า</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <Input
              placeholder="คำขึ้นต้น"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            />
            <Input
              type="number"
              placeholder="ส่วนลด %"
              className="w-28"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
            />
            <Input
              type="number"
              placeholder="จำนวนใบ"
              className="w-28"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <Button onClick={handleGenerate}>สร้าง</Button>
          </CardContent>
        </Card>
        {generated.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>คูปองที่สร้างแล้ว</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>รหัส</TableHead>
                    <TableHead className="text-right">ส่วนลด %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generated.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>{c.code}</TableCell>
                      <TableCell className="text-right">{c.discount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
