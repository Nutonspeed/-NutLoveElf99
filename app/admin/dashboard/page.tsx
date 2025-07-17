"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShoppingCart, Wallet, Clock, MessageSquare } from "lucide-react"
import { mockOrders } from "@/lib/mock-orders"
import { conversations } from "@/lib/mock-conversations"
import { useAuth } from "@/contexts/auth-context"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"

interface OrderData {
  id: string
  customerName: string
  total: number
  status: string
  createdAt: string
}
interface ChatData {
  id: string
  createdAt: string
  text: string
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<OrderData[] | null>(null)
  const [chats, setChats] = useState<ChatData[] | null>(null)
  const [debug, setDebug] = useState(false)

  useEffect(() => {
    setOrders(
      mockOrders.map(o => ({
        id: o.id,
        customerName: o.customerName,
        total: o.total,
        status: o.status,
        createdAt: o.createdAt,
      })),
    )
    setChats(
      conversations.map(c => ({
        id: c.id,
        createdAt: c.updatedAt,
        text: c.lastMessage,
      })),
    )
    setDebug(window.location.search.includes("debug=true"))
  }, [])

  const today = new Date().toDateString()
  const todayOrders = orders?.filter(o => new Date(o.createdAt).toDateString() === today) || []
  const totalSales = orders?.reduce((s, o) => s + o.total, 0) || 0
  const unpaid = orders?.filter(o => o.status === "pendingPayment") || []
  const newChats = chats?.filter(c => new Date(c.createdAt).toDateString() === today) || []
  const recentOrders = orders
    ? [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5)
    : []

  const SummaryCard = ({ title, value, icon: Icon }: { title: string; value: string | number; icon: any }) => (
    <div className="rounded border bg-white p-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <Icon className="h-6 w-6 text-gray-400" />
    </div>
  )

  const quickActions = [
    { href: '/admin/fabrics', label: 'ผ้า' },
    { href: '/admin/bill/create', label: 'เปิดบิล' },
    { href: '/admin/collections', label: 'คอลเลกชัน' },
    { href: '/admin/promo', label: 'โปรโมชัน' },
    { href: '/admin/ai-tools', label: 'เครื่องมือ AI' },
    { href: '/admin/menu', label: 'เมนู' },
    { href: '/chat', label: 'แชท' },
    { href: '/admin/feature-map', label: 'แผนที่ฟีเจอร์' },
  ]

  const systemTools = [
    { href: '/admin/analytics', label: 'สถิติ' },
    { href: '/admin/broadcast', label: 'บรอดแคสต์' },
    { href: '/admin/claims', label: 'เคลม' },
    { href: '/admin/media', label: 'มีเดีย' },
    { href: '/admin/supply-tracker', label: 'ติดตามสต็อก' },
    { href: '/admin/unpaid', label: 'ค้างจ่าย' },
    { href: '/admin/faq', label: 'คำถามพบบ่อย' },
    { href: '/admin/feedback', label: 'ความคิดเห็น' },
    { href: '/admin/campaign-insight', label: 'ข้อมูลแคมเปญ' },
    { href: '/admin/campaigns/summary', label: 'สรุปแคมเปญ' },
    { href: '/admin/bills/fast', label: 'เปิดบิลด่วน' },
    { href: '/admin/users', label: 'ผู้ใช้' },
  ]

  return (
    <div className="p-4 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">แดชบอร์ดแอดมินหลัก</h1>
      </header>

      <h2 className="text-lg font-semibold">สถิติอย่างย่อ</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {!orders || !chats ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24" />)
        ) : (
          <>
            <SummaryCard title="ยอดสั่งซื้อวันนี้" value={todayOrders.length} icon={ShoppingCart} />
            <SummaryCard title="ยอดขายรวม" value={`฿${totalSales.toLocaleString()}`} icon={Wallet} />
            <SummaryCard title="บิลที่ยังไม่โอน" value={unpaid.length} icon={Clock} />
            <SummaryCard title="แชทใหม่วันนี้" value={newChats.length} icon={MessageSquare} />
          </>
        )}
      </div>

      <h2 className="text-lg font-semibold">กราฟข้อมูล</h2>
      <Card>
        <CardContent className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={recentOrders.map(o => ({ name: o.customerName, value: o.total }))}>
              <Line type="monotone" dataKey="value" stroke="#0ea5e9" />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <h2 className="text-lg font-semibold">การทำงานด่วน</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {quickActions.map(a => (
          <Button asChild key={a.href} className="w-full">
            <Link href={a.href}>{a.label}</Link>
          </Button>
        ))}
      </div>

      {user?.role === 'superadmin' && (
        <>
          <h2 className="text-lg font-semibold">เครื่องมือระบบ</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {systemTools.map(t => (
              <Button asChild key={t.href} className="w-full">
                <Link href={t.href}>{t.label}</Link>
              </Button>
            ))}
          </div>
        </>
      )}

      {debug && (
        <div className="rounded border p-4 text-sm space-y-1">
          <p className="font-semibold">Debug</p>
          <p>AutoSell-02 = in progress</p>
          <p>ยังไม่เชื่อม</p>
        </div>
      )}
    </div>
  )
}
