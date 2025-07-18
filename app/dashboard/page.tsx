import DashboardQuickCard from '@/components/DashboardQuickCard'

export default function DashboardPage() {
  const links = [
    { link: '/dashboard/fabrics', title: 'Fabrics', icon: '🧵' },
    { link: '/dashboard/orders', title: 'Orders', icon: '📦' },
    { link: '#', title: 'Collections', icon: '🗂️' },
    { link: '/dashboard/bill/BILL-001', title: 'Bills', icon: '🧾' },
  ]
  return (
    <div className="container mx-auto space-y-6 py-8">
      <div>
        <h1 className="text-2xl font-bold">ยินดีต้อนรับกลับมา!</h1>
        <p className="text-sm text-muted-foreground">Admin Demo - Last login: 2024-05-01</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {links.map((l) => (
          <DashboardQuickCard key={l.link} {...l} />
        ))}
      </div>
    </div>
  )
}
