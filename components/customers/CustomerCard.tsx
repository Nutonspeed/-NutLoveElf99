"use client"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import type { Customer } from "@/lib/mock-customers"
import { useDemo } from "@/contexts/demo-context"

function statusColor(status: string) {
  if (status === "VIP") return "bg-yellow-200 text-yellow-800"
  if (status === "returning") return "bg-green-200 text-green-800"
  return "bg-gray-200 text-gray-800"
}

export default function CustomerCard({ customer }: { customer: Customer }) {
  const { enabled } = useDemo()
  const status =
    customer.tier === "VIP" ? "VIP" : (customer.points ?? 0) > 50 ? "returning" : "new"
  return (
    <Link href={`/dashboard/customers/${customer.id}`} className="block">
      <Card className="hover:bg-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {enabled ? <span className="blur-sm">{customer.name}</span> : customer.name}
            <span
              className={`rounded px-2 py-0.5 text-xs font-medium ${statusColor(status)}`}
            >
              {status}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          {customer.phone && <p>{customer.phone}</p>}
          {customer.tags && (
            <div className="flex flex-wrap gap-1">
              {customer.tags.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
