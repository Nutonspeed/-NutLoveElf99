"use client"
import { useState, useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { getOrders } from "@/core/mock/store"

export default function ProductPerformancePage() {
  const [range, setRange] = useState(30)
  const orders = getOrders()

  const filtered = useMemo(() => {
    const start = new Date()
    start.setDate(start.getDate() - range)
    return orders.filter(o => new Date(o.createdAt) >= start)
  }, [orders, range])

  const sales = useMemo(() => {
    const map: Record<string, number> = {}
    filtered.forEach(o => {
      o.items.forEach(it => {
        map[it.productName] = (map[it.productName] || 0) + it.quantity
      })
    })
    return Object.entries(map).map(([name, qty]) => ({ name, qty }))
  }, [filtered])

  const top = sales.slice().sort((a,b)=>b.qty-a.qty)[0]

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Product Performance (mock)</h1>
      <div className="flex items-center gap-2">
        <label className="text-sm">ช่วงวัน:</label>
        <input type="number" value={range} onChange={e=>setRange(parseInt(e.target.value)||1)} className="w-20 border rounded-md p-1" />
      </div>
      <p className="text-sm">สินค้าขายดีสุด: {top? top.name : '-'} ({top? top.qty : 0} ชิ้น)</p>
      <p className="text-sm">สินค้าที่ถูกคืนบ่อยสุด: - (mock)</p>
      <Card>
        <CardHeader><CardTitle>ยอดขาย/ชิ้น</CardTitle></CardHeader>
        <CardContent className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sales}>
              <XAxis dataKey="name" tick={{fontSize:10}} interval={0} angle={-20} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="qty" fill="#8884d8" name="จำนวน" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
