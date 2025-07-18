import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { fabrics } from '@/mock/fabrics'
import { orders } from '@/mock/orders'
import { mockBills } from '@/mock/bills'

export default function DashboardPage() {
  const stats = [
    { label: 'Total Fabrics', value: fabrics.length },
    { label: 'Total Orders', value: orders.length },
    { label: 'Total Bills', value: mockBills.length },
  ]
  const links = [
    { href: '/dashboard/fabrics', label: 'Fabrics' },
    { href: '/dashboard/orders', label: 'Orders' },
    { href: '#', label: 'Collections' },
    { href: '/dashboard/bill/BILL-001', label: 'Bills' },
  ]
  const latest = orders.slice(0, 3)
  return (
    <div className="container mx-auto space-y-6 py-8">
      <h1 className="text-2xl font-bold">สวัสดี Admin</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader>
              <CardTitle className="text-sm">{s.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{s.value}</CardContent>
          </Card>
        ))}
      </div>
      <SectionHeader title="Quick Links" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="rounded border p-4 text-center hover:bg-gray-50">
            {l.label}
          </Link>
        ))}
      </div>
      <SectionHeader title="Latest Orders" />
      <ul className="space-y-2">
        {latest.map((o) => (
          <li key={o.id} className="flex justify-between border-b pb-2 text-sm">
            <span>{o.id}</span>
            <span>฿{o.total.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
