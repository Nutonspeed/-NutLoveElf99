"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockOrders } from "@/lib/mock-orders"
import { addSupplyEntry, listSupplyForOrder, type SupplyItem } from "@/lib/mock-supply"
import { getMockNow } from "@/lib/mock-date"

export default function OrderSupplyPage({ params }: { params: { id: string } }) {
  const { id } = params
  const order = mockOrders.find((o) => o.id === id)
  const [items, setItems] = useState<SupplyItem[]>(listSupplyForOrder(id))
  const [item, setItem] = useState("")
  const [qty, setQty] = useState("")
  const [eta, setEta] = useState(
    new Date(getMockNow().getTime() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16),
  )

  if (!order) {
    return <div className="min-h-screen flex items-center justify-center">ไม่พบออเดอร์</div>
  }

  const addItem = () => {
    if (!item || !qty) return
    const entry = addSupplyEntry({ orderId: id, item, quantity: Number(qty), eta })
    setItems([...items, entry])
    setItem("")
    setQty("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <Link href={`/admin/orders/${id}`}>\
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">วัตถุดิบออเดอร์ {id}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>เพิ่มรายการวัตถุดิบ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Input value={item} onChange={(e) => setItem(e.target.value)} placeholder="ชื่อวัตถุดิบ" />
            <Input
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="จำนวน"
              type="number"
            />
            <Input
              type="datetime-local"
              value={eta}
              onChange={(e) => setEta(e.target.value)}
            />
            <Button onClick={addItem} disabled={!item || !qty}>
              <Plus className="h-4 w-4 mr-2" /> เพิ่ม
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>รายการวัตถุดิบ</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อ</TableHead>
                  <TableHead>จำนวน</TableHead>
                  <TableHead>ETA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((i) => (
                  <TableRow key={i.id} className={new Date(i.eta) < getMockNow() ? "bg-red-100" : ""}>
                    <TableCell>{i.item}</TableCell>
                    <TableCell>{i.quantity}</TableCell>
                    <TableCell>{new Date(i.eta).toLocaleString("th-TH")}</TableCell>
                  </TableRow>
                ))}
                {items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-sm text-gray-500">
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
