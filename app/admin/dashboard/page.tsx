"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent } from "@/components/ui/cards/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ShoppingCart,
  Wallet,
  MessageSquare,
  Users as UsersIcon,
  Inbox,
} from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import DashboardCard from "@/components/admin/dashboard/DashboardCard"
import { useBillInsights } from "@/hooks/useBillInsights"
import { mockCustomers, type Customer } from "@/lib/mock-customers"
import {
  mockDB,
  countOrders,
  sumOrderTotal,
  countChats,
  averageFeedback,
  isWithinDays,
} from "@/mock/mock-db"
import { conversations } from "@/lib/mock-conversations"
import { useAuth } from "@/contexts/auth-context"
import PageWrapper from "@/components/admin/PageWrapper"

interface OrderData {
  id: string
  customerName: string
  total: number
  createdAt: string
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const insights = useBillInsights()
  const [range, setRange] = useState<'1' | '7' | '30' | 'all'>('7')
  const [orders, setOrders] = useState<OrderData[] | null>(null)
  const [customers, setCustomers] = useState<Customer[] | null>(null)
  const [chatCount, setChatCount] = useState<number | null>(null)
  const [feedbackScore, setFeedbackScore] = useState<number | null>(null)

  useEffect(() => {
    const days = range === 'all' ? undefined : Number(range)
    const filteredOrders = days ? mockDB.orders.filter(o => isWithinDays(o.createdAt, days)) : mockDB.orders
    setOrders(filteredOrders.map(o => ({ id: o.id, customerName: o.customerName, total: o.total, createdAt: o.createdAt })))
    const filteredCustomers = days ? mockCustomers.filter(c => isWithinDays(c.createdAt, days)) : mockCustomers
    setCustomers(filteredCustomers)
    setChatCount(countChats(days))
    setFeedbackScore(Number(averageFeedback(days).toFixed(1)))
  }, [range])

  const loading = !orders || !customers || chatCount === null

  const totalSales = orders?.reduce((s, o) => s + o.total, 0) || 0
  const recentOrders = orders ? orders.slice(0, 3) : []
  const newCustomers = customers ? customers.slice(0, 3) : []
  const latestMessages = conversations
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3)

  const dailyData = insights.daily.map(d => ({ name: d.date, value: d.amount }))

  const Fallback = () => (
    <div className="flex flex-col items-center justify-center py-6 text-sm text-muted-foreground">
      <Inbox className="h-6 w-6 mb-2" />
      ไม่มีข้อมูลในระบบ
    </div>
  )

  return (
    <PageWrapper
      title="แดชบอร์ดแอดมินหลัก"
      breadcrumb={[{ title: "แดชบอร์ด" }]}
    >

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">สรุปยอดขายวันนี้</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardCard title="ยอดขายวันนี้" value={`฿${insights.todayTotal.toLocaleString()}`} icon={Wallet} />
          <DashboardCard title="จำนวนบิล" value={insights.todayCount} icon={ShoppingCart} />
          {insights.highestBill && (
            <DashboardCard
              title="ยอดขายสูงสุด"
              subtext={insights.highestBill.id}
              value={`฿${insights.highestBill.total.toLocaleString()}`}
              icon={Wallet}
            />
          )}
        </div>
        {insights.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {insights.tags.slice(0, 3).map(t => (
              <span key={t.tag} className="text-xs bg-muted rounded px-2 py-1">
                {t.tag} ({t.count})
              </span>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">สถิติอย่างย่อ</h2>
          <Select
            value={range}
            onValueChange={(value) =>
              setRange(value as '1' | '7' | '30' | 'all')
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">วันนี้</SelectItem>
              <SelectItem value="7">7 วันล่าสุด</SelectItem>
              <SelectItem value="30">30 วัน</SelectItem>
              <SelectItem value="all">ทั้งหมด</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24" />)
          ) : (
            <>
              <DashboardCard
                title="ยอดขายทั้งหมด"
                value={`฿${totalSales.toLocaleString()}`}
                icon={Wallet}
                onClick={() => router.push('/admin/bills')}
              />
              <DashboardCard
                title="จำนวนออเดอร์"
                value={orders!.length}
                icon={ShoppingCart}
                onClick={() => router.push('/admin/bills/fast')}
              />
              <DashboardCard
                title="คะแนน feedback"
                value={feedbackScore ?? 0}
                icon={MessageSquare}
                onClick={() => router.push('/admin/feedback')}
              />
            </>
          )}
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">ออเดอร์ล่าสุด</h2>
          <Button variant="link" size="sm" onClick={() => router.push('/admin/bills')}>
            ดูทั้งหมด
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
          <Button variant="link" size="sm" onClick={() => router.push('/admin/customers')}>
            ดูทั้งหมด
          </Button>
        </div>
        {insights.newCustomerTags.length > 0 && (
          <div className="flex flex-wrap gap-2 pb-2">
            {insights.newCustomerTags.map(t => (
              <span key={t.tag} className="text-xs bg-muted rounded px-2 py-1">
                {t.tag} ({t.count})
              </span>
            ))}
          </div>
        )}
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
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">ข้อความล่าสุด</h2>
          <Button variant="link" size="sm" onClick={() => router.push('/admin/chat')}>
            ดูทั้งหมด
          </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <Skeleton className="h-24 w-full" />
            ) : latestMessages.length ? (
              <ul className="divide-y">
                {latestMessages.map(m => (
                  <li key={m.id} className="px-4 py-2 text-sm">
                    <span className="font-medium">{m.customerName}:</span> {m.lastMessage}
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
                <BarChart data={dailyData} margin={{ left: 0, right: 0 }}>
                  <Bar dataKey="value" fill="#0ea5e9" />
                  <XAxis dataKey="name" />
                  <YAxis hide />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </section>
    </PageWrapper>
  )
}

