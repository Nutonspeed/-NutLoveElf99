"use client"
import React from "react"
import { useMemo } from "react"
import { PieChart, Pie, Cell, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { useOrderStore, useCustomerStore } from "@/core/store"

const COLORS = ["#0088FE", "#FFBB28"]

export default function CustomerBehaviorPage() {
  const orders = useOrderStore((s) => s.orders)
  const customers = useCustomerStore((s) => s.customers)

  const ordersPerCustomer = useMemo(() => {
    const map: Record<string, number> = {}
    orders.forEach(o => {
      map[o.customerId] = (map[o.customerId] || 0) + 1
    })
    const counts = Object.values(map)
    const avg = counts.reduce((s, n) => s + n, 0) / customers.length
    const repeat = counts.filter(n => n > 1).length
    return { avg: avg.toFixed(2), repeatRate: ((repeat / customers.length) * 100).toFixed(1) }
  }, [orders, customers])

  const heatmap = useMemo(() => {
    const map: Record<string, number> = {}
    orders.forEach(o => {
      const d = new Date(o.createdAt)
      const key = `${d.getDay()}-${d.getHours()}`
      map[key] = (map[key] || 0) + 1
    })
    return map
  }, [orders])

  const pieData = [
    { name: "กลับมาซื้อ", value: ordersPerCustomer.repeatRate ? parseFloat(ordersPerCustomer.repeatRate) : 0 },
    { name: "ลูกค้าใหม่", value: 100 - (ordersPerCustomer.repeatRate ? parseFloat(ordersPerCustomer.repeatRate) : 0) },
  ]

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Customer Behavior (mock)</h1>
      <p className="text-sm">เฉลี่ย {ordersPerCustomer.avg} ออเดอร์/คน, repeat rate {ordersPerCustomer.repeatRate}%</p>
      <Card>
        <CardHeader><CardTitle>Repeat Rate</CardTitle></CardHeader>
        <CardContent className="flex justify-center">
          <PieChart width={200} height={200}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>ช่วงเวลาซื้อบ่อย</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-8 gap-1 text-center text-xs">
            <div></div>
            {Array.from({ length: 24 }).map((_,h)=>(<div key={h}>{h}</div>))}
            {[0,1,2,3,4,5,6].map(d=> (
              <React.Fragment key={d}>
                <div className="font-bold">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d]}</div>
                {Array.from({ length:24 }).map((_,h)=>{
                  const val = heatmap[`${d}-${h}`]||0
                  const bg = val? `rgba(56,189,248,${Math.min(1,val/5)})` : 'rgba(0,0,0,0.05)'
                  return <div key={h} style={{backgroundColor:bg}} className="h-4" />
                })}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
