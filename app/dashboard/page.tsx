"use client"

import DashboardQuickCard from '@/components/dashboard/DashboardQuickCard'
import OrderCard from '@/components/orders/OrderCard'
import { fabrics } from '@/mock/fabrics'
import { orders } from '@/mock/orders'
import { mockBills } from '@/mock/bills'
import SectionHeader from '@/components/ui/SectionHeader'
import { useSearchParams } from 'next/navigation'

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const preview = searchParams.get('preview') === 'grouped'
  const today = new Date().toLocaleDateString('th-TH')
  const links = [
    {
      link: '/dashboard/fabrics',
      title: 'Fabrics',
      icon: '🧵',
      count: fabrics.length,
    },
    {
      link: '/dashboard/orders',
      title: 'Orders',
      icon: '📦',
      count: orders.length,
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
      count: mockBills.length,
    },
  ]
  const latest = orders.slice(0, 3)
  if (preview) {
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-bold">Preview Dashboard</h1>
        <div className="grid md:grid-cols-2 gap-4">
          {links.map(l => (
            <DashboardQuickCard key={l.link} {...l} />
          ))}
        </div>
      </div>
    )
  }

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
