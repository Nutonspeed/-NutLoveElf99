"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/buttons/button"
import MockPromoModal from "@/components/admin/MockPromoModal"
import { chatNotifications } from "@/lib/mock/chat-notify"

interface OrderData {
  id: string
  status: string
  total: number
  createdAt: string
}

const fallbackOrders: OrderData[] = [
  { id: "A1", status: "pendingPayment", total: 1000, createdAt: "2024-06-08T08:00:00Z" },
  { id: "A2", status: "paid", total: 2000, createdAt: "2024-06-08T10:00:00Z" },
  { id: "A3", status: "pendingPayment", total: 1500, createdAt: "2024-06-07T09:00:00Z" },
  { id: "A4", status: "depositPaid", total: 2500, createdAt: "2024-06-06T13:00:00Z" },
  { id: "A5", status: "completed", total: 3000, createdAt: "2024-06-05T08:00:00Z" },
]

export default function AdminDashboardMobile() {
  const router = useRouter()
  const [orders, setOrders] = useState<OrderData[] | null>(null)
  const [showPromo, setShowPromo] = useState(false)

  useEffect(() => {
    fetch("/mock/orders.json")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: OrderData[]) => setOrders(data))
      .catch(() => setOrders(fallbackOrders))
  }, [])

  const today = new Date().toDateString()
  const todayOrders = orders?.filter((o) => new Date(o.createdAt).toDateString() === today) || []
  const unpaid = orders?.filter((o) => o.status === "pendingPayment") || []
  const totalSales = orders?.reduce((sum, o) => sum + o.total, 0) || 0
  const newChats = chatNotifications.length

  const Summary = () => (
    <div className="grid grid-cols-2 gap-3">
      <StatCard title="ออเดอร์วันนี้" value={todayOrders.length} />
      <StatCard title="ยังไม่โอน" value={unpaid.length} />
      <StatCard title="แชทใหม่" value={newChats} />
      <StatCard title="ยอดขายรวม" value={`฿${totalSales.toLocaleString()}`} />
    </div>
  )

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={() => router.push("/admin/bill/create")}>เปิดบิลเร็ว</Button>
        <Button onClick={() => router.push("/collections/latest")}>ลายผ้าล่าสุด</Button>
        <Button onClick={() => setShowPromo(true)}>ส่งโปร</Button>
        <Button onClick={() => router.push("/chat")}>แชทกับลูกค้า</Button>
      </div>
      {orders ? <Summary /> : <p>กำลังโหลด...</p>}
      <MockPromoModal open={showPromo} onClose={() => setShowPromo(false)} />
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded bg-white p-4 text-center shadow">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  )
}
