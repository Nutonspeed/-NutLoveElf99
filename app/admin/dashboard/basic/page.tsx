"use client"

import Link from "next/link"
import { mockOrders } from "@/lib/mock-orders"
import { mockProducts } from "@/lib/mock-products"

export default function AdminDashboardBasic() {
  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.total, 0)
  const average = totalRevenue / mockOrders.length || 0
  const latest = [...mockOrders].reverse().slice(0, 5)

  const productSales: Record<string, number> = {}
  mockOrders.forEach((o) => {
    o.items.forEach((i) => {
      productSales[i.productId] = (productSales[i.productId] || 0) + i.quantity
    })
  })
  const topProducts = mockProducts
    .map((p) => ({ ...p, sold: productSales[p.id] || 0 }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 3)

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">แดชบอร์ด</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard title="ยอดขายรวมเดือนนี้" value={`${totalRevenue.toLocaleString()} บาท`} />
        <StatCard title="คำสั่งซื้อทั้งหมด" value={`${mockOrders.length} รายการ`} />
        <StatCard title="ยอดเฉลี่ยต่อบิล" value={`${average.toFixed(0)} บาท`} />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">รายการล่าสุด</h2>
        <ul className="divide-y border rounded bg-white">
          {latest.map((o) => (
            <li key={o.id} className="p-2">
              <Link href={`/admin/orders/${o.id}`}> 
                <span className="text-blue-600 underline">#{o.id}</span> – {o.customerName} – {o.total} บาท
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">สินค้าขายดี</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {topProducts.map((p) => (
            <li key={p.id} className="bg-white p-3 rounded border">
              <img src={p.images[0]} alt={p.name} className="w-full h-24 object-cover rounded mb-2" />
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-xs text-gray-500">ขายแล้ว: {p.sold} ชิ้น</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-right">
        <Link href="/admin/orders" className="text-blue-600 underline">
          ดูคำสั่งซื้อทั้งหมด →
        </Link>
      </div>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  )
}
