"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone } from "lucide-react"
import type { Customer } from "@/lib/mock-customers"

export default function CustomerCard({ customer, className = "" }: { customer: Customer; className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{customer.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center space-x-2">
          <Mail className="h-4 w-4 text-gray-500" />
          <span>{customer.email}</span>
        </div>
        {customer.phone && (
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span>{customer.phone}</span>
          </div>
        )}
        {customer.tags && (
          <div className="flex flex-wrap gap-1 pt-2">
            {customer.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {customer.note && <p className="text-sm text-gray-500">{customer.note}</p>}
        <p className="text-sm text-gray-500">
          {customer.lastSeen
            ? `ใช้งานล่าสุด ${new Date(customer.lastSeen).toLocaleString('th-TH')}`
            : 'ไม่มีข้อมูลการเข้าใช้งานของลูกค้า'}
        </p>
      </CardContent>
    </Card>
  )
}
