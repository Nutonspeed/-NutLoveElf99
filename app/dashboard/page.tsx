"use client"

import DashboardQuickCard from '@/components/dashboard/DashboardQuickCard'
import OrderCard from '@/components/orders/OrderCard'
import { getFabrics, getSimpleOrders, getBills } from '@/core/mock/store'
import SectionHeader from '@/components/ui/SectionHeader'

export default function DashboardPage() {
  const today = new Date().toLocaleDateString('th-TH')
  const links = [
    {
      link: '/dashboard/fabrics',
      title: 'Fabrics',
      icon: '🧵',
      count: getFabrics().length,
    },
    {
      link: '/dashboard/orders',
      title: 'Orders',
      icon: '📦',
      count: getSimpleOrders().length,
    },
    {
      link: '/dashboard/collections',
      title: 'Collections',
      icon: '🗂️',
      count: null,
    },
    {
      link: '/dashboard/bill/BILL-001',
      title: 'Bills',
      icon: '🧾',
      count: getBills().length,
    },
  ]
  const latest = getSimpleOrders().slice(0, 3)
  return (
    <div className="container mx-auto space-y-6 py-8">
      <div>
        <h1 className="text-2xl font-bold">ยินดีต้อนรับกลับมา!</h1>
        <p className="text-sm text-muted-foreground">{today}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {links.map((l) => (
              <DashboardQuickCard key={l.link} {...l} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <SectionHeader title="คำสั่งซื้อล่าสุด" />
          {latest.map((o) => (
            <OrderCard key={o.id} id={o.id} customer={o.customer} status={o.status} total={o.total} />
          ))}
        </div>
      </div>
    </div>
  )
}
