"use client"

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const featureMap: Record<string, string[]> = {
  Order: [
    "Order list",
    "Order detail",
    "Invoice generation",
    "Shipping label",
  ],
  Customer: ["Customer directory", "Customer profile"],
  Product: ["Product catalog", "Collections"],
  Payment: ["Slip upload", "Online invoice"],
  Review: ["Customer reviews", "Admin reply"],
}

export default function FeatureMapPage() {
  return (
    <div className="container mx-auto py-8 space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Feature Map</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold">Feature Map</h1>
      <pre className="bg-muted p-4 rounded overflow-auto text-sm">
        {JSON.stringify(featureMap, null, 2)}
      </pre>
    </div>
  )
}
