import Link from 'next/link'

export default function DashboardReportsPage() {
  const items = [
    { href: '/dashboard/reports/sales', label: 'Sales Summary' },
    { href: '/dashboard/reports/products', label: 'Product Report' },
    { href: '/dashboard/reports/customers', label: 'Customer Report' },
    { href: '/dashboard/reports/staff', label: 'Staff Report' },
    { href: '/dashboard/reports/export', label: 'Export Report' },
  ]
  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Reports</h1>
      <ul className="list-disc pl-6 space-y-1">
        {items.map(i => (
          <li key={i.href}>
            <Link className="text-blue-600 underline" href={i.href}>{i.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
