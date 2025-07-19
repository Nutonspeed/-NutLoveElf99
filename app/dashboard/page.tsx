import DashboardQuickCard from '@/components/dashboard/DashboardQuickCard'
import OrderCard from '@/components/orders/OrderCard'
import { orders } from '@/mock/orders'
import SectionHeader from '@/components/ui/SectionHeader'

export default function DashboardPage() {
  const today = new Date().toLocaleDateString('th-TH')
  const links = [
    {
      link: '/dashboard/orders',
      title: 'Orders',
      icon: '📦',
    },
    {
      link: '/dashboard/customers',
      title: 'Customers',
      icon: '👥',
    },
    {
      link: '/dashboard/analytics',
      title: 'Reports',
      icon: '📊',
    },
    {
      link: '/reviews',
      title: 'Reviews',
      icon: '⭐',
    },
    {
      link: '/dashboard/settings',
      title: 'Settings',
      icon: '⚙️',
    },
  ]
  const latest = orders.slice(0, 3)
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
