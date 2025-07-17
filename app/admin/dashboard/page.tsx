"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShoppingCart, Wallet, Clock, MessageSquare } from "lucide-react"

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
  const [orders, setOrders] = useState<OrderData[] | null>(null)
  const [chats, setChats] = useState<ChatData[] | null>(null)
  const [debug, setDebug] = useState(false)

  useEffect(() => {
    fetch("/mock/orders.json")
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(setOrders)
      .catch(() => setOrders([]))
    fetch("/mock/chat.json")
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(setChats)
      .catch(() => setChats([]))
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

  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr]">
      <aside className="hidden md:block w-56 border-r bg-gray-50 p-4 space-y-2">
        <Link href="/admin/fabrics" className="block p-2 hover:underline">
          ผ้า
        </Link>
        <Link href="/admin/orders" className="block p-2 hover:underline">
          คำสั่งซื้อ
        </Link>
        <Link href="/admin/ai-tools" className="block p-2 hover:underline">
          เครื่องมือ AI
        </Link>
        <Link href="/chat" className="block p-2 hover:underline">
          แชท
        </Link>
        <Link href="/admin/feature-map" className="block p-2 hover:underline">
          แผนที่ฟีเจอร์
        </Link>
        <Link href="/admin/menu" className="block p-2 hover:underline">
          เมนู
        </Link>
      </aside>
      <div className="p-4 space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">แดชบอร์ดแอดมินหลัก</h1>
        </header>

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

        <Card>
          <CardHeader>
            <CardTitle>ออเดอร์ล่าสุด</CardTitle>
          </CardHeader>
          <CardContent>
            {!orders ? (
              <p>กำลังโหลด...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ชื่อลูกค้า</TableHead>
                    <TableHead>ยอด</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead>แชท</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map(o => (
                    <TableRow key={o.id}>
                      <TableCell>{o.customerName}</TableCell>
                      <TableCell>฿{o.total.toLocaleString()}</TableCell>
                      <TableCell>{o.status}</TableCell>
                      <TableCell>
                        <Link href={`/chat?order=${o.id}`} className="text-blue-600 underline">
                          เปิด
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <div className="mt-2 text-right">
              <Link href="/admin/orders" className="text-sm text-primary underline">
                ดูทั้งหมด
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>ข้อมูลเชิงลึก AI</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                <li>Top Pattern: Floral</li>
                <li>Best Product: Sofa Set A</li>
                <li>Most Asked Fabric: Cotton</li>
              </ul>
            </CardContent>
          </Card>
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
            <Button asChild className="w-full">
              <Link href="/admin/fabrics">ผ้า</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/admin/bill/create">เปิดบิล</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/admin/collections">คอลเลกชัน</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/admin/promo">โปรโมชัน</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/admin/ai-tools">เครื่องมือ AI</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/admin/menu">เมนู</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/chat">แชท</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/admin/feature-map">แผนที่ฟีเจอร์</Link>
            </Button>
              <Button asChild className="w-full">
                <Link href="/admin/analytics">สถิติ</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/admin/broadcast">บรอดแคสต์</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/admin/claims">เคลม</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/admin/media">มีเดีย</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/admin/supply-tracker">ติดตามสต็อก</Link>
              </Button>
            <Button asChild className="w-full">
              <Link href="/admin/unpaid">ค้างจ่าย</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/admin/faq">คำถามพบบ่อย</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/admin/feedback">ความคิดเห็น</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/admin/campaign-insight">ข้อมูลแคมเปญ</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/admin/campaigns/summary">สรุปแคมเปญ</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/admin/bills/fast">เปิดบิลด่วน</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/admin/users">ผู้ใช้</Link>
            </Button>
          </div>
        </div>

        {debug && (
          <div className="rounded border p-4 text-sm space-y-1">
            <p className="font-semibold">Debug</p>
            <p>AutoSell-02 = in progress</p>
            <p>ยังไม่เชื่อม</p>
          </div>
        )}
      </div>
    </div>
  )
}
