"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent } from "@/components/ui/cards/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ShoppingCart,
  Wallet,
  MessageSquare,
  Users as UsersIcon,
  Inbox,
} from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"
import { mockOrders } from "@/lib/mock-orders"
import { conversations } from "@/lib/mock-conversations"
import { mockCustomers, type Customer } from "@/lib/mock-customers"
import { useAuth } from "@/contexts/auth-context"

interface OrderData {
  id: string
  customerName: string
  total: number
  createdAt: string
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<OrderData[] | null>(null)
  const [customers, setCustomers] = useState<Customer[] | null>(null)
  const [chatCount, setChatCount] = useState<number | null>(null)

  useEffect(() => {
    setOrders(
      mockOrders.map(o => ({ id: o.id, customerName: o.customerName, total: o.total, createdAt: o.createdAt }))
    )
    setCustomers(mockCustomers)
    setChatCount(conversations.length)
  }, [])

  const loading = !orders || !customers || chatCount === null

  const totalSales = orders?.reduce((s, o) => s + o.total, 0) || 0
  const recentOrders = orders ? orders.slice(0, 3) : []
  const newCustomers = customers ? customers.slice(0, 3) : []

  const dailyData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const value = orders
      ? orders
          .filter(o => new Date(o.createdAt).toDateString() === d.toDateString())
          .reduce((s, o) => s + o.total, 0)
      : 0
    return { name: d.toLocaleDateString('th-TH', { month: 'short', day: 'numeric' }), value }
  })

  const Fallback = () => (
    <div className="flex flex-col items-center justify-center py-6 text-sm text-muted-foreground">
      <Inbox className="h-6 w-6 mb-2" />
      ไม่มีข้อมูลในระบบ
    </div>
  )

  return (
    <div className="p-4 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">แดชบอร์ดแอดมินหลัก</h1>
      </header>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">สถิติอย่างย่อ</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24" />)
          ) : (
            <>
              <SummaryCard title="ยอดขายรวม" value={`฿${totalSales.toLocaleString()}`} icon={Wallet} />
              <SummaryCard title="ออเดอร์ทั้งหมด" value={orders!.length} icon={ShoppingCart} />
              <SummaryCard title="จำนวนแชท" value={chatCount} icon={MessageSquare} />
            </>
          )}
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">ออเดอร์ล่าสุด</h2>
          <Button variant="link" size="sm" asChild>
            <Link href="/admin/bills">ดูทั้งหมด</Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <Skeleton className="h-24 w-full" />
            ) : recentOrders.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>รหัส</TableHead>
                    <TableHead>ลูกค้า</TableHead>
                    <TableHead className="text-right">ยอด</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map(o => (
                    <TableRow key={o.id}>
                      <TableCell>{o.id}</TableCell>
                      <TableCell>{o.customerName}</TableCell>
                      <TableCell className="text-right">฿{o.total.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Fallback />
            )}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">ลูกค้าใหม่</h2>
          <Button variant="link" size="sm" asChild>
            <Link href="/admin/customers">ดูทั้งหมด</Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <Skeleton className="h-24 w-full" />
            ) : newCustomers.length ? (
              <ul className="divide-y">
                {newCustomers.map(c => (
                  <li key={c.id} className="flex items-center justify-between px-4 py-2">
                    <span>{c.name}</span>
                    <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  </li>
                ))}
              </ul>
            ) : (
              <Fallback />
            )}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">ยอดขายรายวัน</h2>
        <Card>
          <CardContent className="h-40 overflow-x-auto">
            {loading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData} margin={{ left: 0, right: 0 }}>
                  <Line type="monotone" dataKey="value" stroke="#0ea5e9" />
                  <XAxis dataKey="name" />
                  <YAxis hide />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

function SummaryCard({ title, value, icon: Icon }: { title: string; value: string | number; icon: any }) {
  return (
    <div className="rounded border p-4 flex items-center justify-between bg-card">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <Icon className="h-6 w-6 text-muted-foreground" />
    </div>
  )
}
