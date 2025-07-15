"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone } from "lucide-react"
import { useState } from "react"
import type { Customer } from "@/lib/mock-customers"
import { setCustomerAddress, setCustomerFacebook } from "@/lib/mock-customers"

export default function CustomerCard({ customer, className = "" }: { customer: Customer; className?: string }) {
  const [facebook, setFacebook] = useState(customer.facebook || "")
  const [address, setAddress] = useState(customer.address || "")

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
        <div className="space-y-1">
          <label className="text-sm font-medium">Facebook</label>
          <input
            className="border px-2 py-1 rounded w-full"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            onBlur={() => setCustomerFacebook(customer.id, facebook)}
            placeholder="https://facebook.com/..."
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">ที่อยู่จัดส่ง</label>
          <textarea
            className="border px-2 py-1 rounded w-full"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={() => setCustomerAddress(customer.id, address)}
            placeholder="ยังไม่กรอกที่อยู่"
          />
        </div>
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
      </CardContent>
    </Card>
  )
}
