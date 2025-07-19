"use client"

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const flow = [
  "Customer → Order",
  "Order → Payment",
  "Payment → Status",
  "Status → Delivery",
]

export default function FlowGraphPage() {
  return (
    <div className="container mx-auto py-8 space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Flow Diagram</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold">Flow Diagram</h1>
      <div className="space-y-1 bg-muted p-4 rounded">
        {flow.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
    </div>
  )
}
