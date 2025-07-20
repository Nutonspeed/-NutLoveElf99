'use client'
import { useEffect, useState } from 'react'
import { fetchDashboardStats } from '@/lib/mock-dashboard'
import DashboardLayout from '@/components/layouts/DashboardLayout'

export default function OverviewPage() {
  const [stats, setStats] = useState<any>()
  useEffect(() => {
    fetchDashboardStats().then(setStats)
  }, [])

  const sections = [
    { href: '/dashboard', title: 'Overview' },
    { href: '/dashboard/orders', title: 'Orders' },
    { href: '/dashboard/customers', title: 'Customers' },
    { href: '/dashboard/reviews', title: 'Reviews' },
    { href: '/dashboard/settings', title: 'Settings' },
  ]

  return (
    <DashboardLayout sections={sections}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">System Overview</h1>
        {stats ? (
          <ul className="list-disc ml-5 space-y-1 text-sm">
            <li>Total orders: {stats.totalOrders}</li>
            <li>Pending orders: {stats.pendingOrders}</li>
            <li>Total products: {stats.totalProducts}</li>
            <li>Total customers: {stats.totalCustomers}</li>
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </DashboardLayout>
  )
}
