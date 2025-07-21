"use client"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/buttons/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/inputs/input"
import { mockBills } from "@/mock/bills"
import { mockOrders } from "@/lib/mock-orders"
import { downloadShippingCSV } from "@/lib/shipping-export"

export default function LabelBatchPage() {
  const [provider, setProvider] = useState("all")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [selected, setSelected] = useState<string[]>([])

  const bills = mockBills.filter(b => {
    const order = mockOrders.find(o => o.id === b.orderId)
    if (!order) return false
    const provOk = provider === "all" || order.delivery_method === provider
    const date = b.createdAt.slice(0,10)
    const startOk = !start || date >= start
    const endOk = !end || date <= end
    return provOk && startOk && endOk
  })

  const toggle = (id: string, checked: boolean) => {
    setSelected(prev => checked ? [...prev, id] : prev.filter(s => s !== id))
  }

  const handleExport = () => {
    const rows = mockBills.filter(b => selected.includes(b.id))
    downloadShippingCSV(rows as any)
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">พิมพ์ใบจ่าหน้า</h1>
      <div className="flex flex-wrap gap-2 items-end">
        <Select value={provider} onValueChange={setProvider}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="ขนส่ง" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทุกขนส่ง</SelectItem>
            <SelectItem value="Flash">Flash</SelectItem>
            <SelectItem value="Kerry">Kerry</SelectItem>
            <SelectItem value="EMS">EMS</SelectItem>
          </SelectContent>
        </Select>
        <Input type="date" value={start} onChange={e=>setStart(e.target.value)} className="w-36" />
        <Input type="date" value={end} onChange={e=>setEnd(e.target.value)} className="w-36" />
        <Button onClick={handleExport} disabled={selected.length === 0}>
          ส่งออกไฟล์ขนส่ง (CSV)
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>ID</TableHead>
            <TableHead>ลูกค้า</TableHead>
            <TableHead>สถานะ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map(b => (
            <TableRow key={b.id} className="hover:bg-muted/50">
              <TableCell>
                <input
                  type="checkbox"
                  checked={selected.includes(b.id)}
                  onChange={e => toggle(b.id, e.target.checked)}
                />
              </TableCell>
              <TableCell>{b.id}</TableCell>
              <TableCell>{b.customer}</TableCell>
              <TableCell className="capitalize">{b.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
