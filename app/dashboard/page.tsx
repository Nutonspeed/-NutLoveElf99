import DashboardQuickCard from '@/components/dashboard/DashboardQuickCard'
import OrderCard from '@/components/orders/OrderCard'
import { fabrics } from '@/mock/fabrics'
import { orders } from '@/mock/orders'
import { mockBills } from '@/mock/bills'
import { mockCustomers } from '@/lib/mock-customers'
import SectionHeader from '@/components/ui/SectionHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function DashboardPage() {
  const today = new Date().toLocaleDateString('th-TH')
  const orderLinks = [
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

  const customerLinks = [
    {
      link: '/dashboard/customers',
      title: 'Customers',
      icon: '👥',
      count: mockCustomers.length,
    },
  ]

  const reviewLinks = [
    {
      link: '/reviews',
      title: 'Reviews',
      icon: '⭐',
      count: null,
    },
  ]

  const reportLinks = [
    {
      link: '/dashboard/analytics',
      title: 'Analytics',
      icon: '📈',
      count: null,
    },
  ]
  const latest = orders.slice(0, 3)
  return (
    <div className="container mx-auto space-y-6 py-8">
      <div>
        <h1 className="text-2xl font-bold">ยินดีต้อนรับกลับมา!</h1>
        <p className="text-sm text-muted-foreground">{today}</p>
      </div>
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
          <TabsTrigger value="report">Report</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {orderLinks.map((l) => (
              <DashboardQuickCard key={l.link} {...l} />
            ))}
          </div>
          <SectionHeader title="คำสั่งซื้อล่าสุด" />
          {latest.map((o) => (
            <OrderCard key={o.id} id={o.id} customer={o.customer} status={o.status} total={o.total} />
          ))}
        </TabsContent>

        <TabsContent value="customer" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {customerLinks.map((l) => (
              <DashboardQuickCard key={l.link} {...l} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="review" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reviewLinks.map((l) => (
              <DashboardQuickCard key={l.link} {...l} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="report" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reportLinks.map((l) => (
              <DashboardQuickCard key={l.link} {...l} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
