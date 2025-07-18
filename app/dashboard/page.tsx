import DashboardQuickCard from '@/components/dashboard/DashboardQuickCard'
import { fabrics } from '@/mock/fabrics'
import { orders } from '@/mock/orders'
import { mockBills } from '@/mock/bills'

export default function DashboardPage() {
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
      link: '#',
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
  return (
    <div className="container mx-auto space-y-6 py-8">
      <div>
        <h1 className="text-2xl font-bold">ยินดีต้อนรับกลับมา!</h1>
        <p className="text-sm text-muted-foreground">Admin Demo - Last login: 2024-05-01</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((l) => (
          <DashboardQuickCard key={l.link} {...l} />
        ))}
      </div>
    </div>
  )
}
