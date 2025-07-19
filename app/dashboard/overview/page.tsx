"use client"
import { getOrders } from '@/core/mock/store'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export default function OverviewPage() {
  const orders = getOrders()
  const pending = orders.filter(o => o.status === 'pendingPayment').length
  const delivered = orders.filter(o => o.status === 'delivered').length
  return (
    <div className="container mx-auto py-8 space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Overview</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold">System Overview</h1>
      <ul className="space-y-1">
        <li>Total orders: {orders.length}</li>
        <li>Pending payment: {pending}</li>
        <li>Delivered: {delivered}</li>
      </ul>
    </div>
  )
}
