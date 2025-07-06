"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mail, Phone } from "lucide-react"
import type { User as Customer } from "@/lib/database"

interface CustomerProfileProps {
  customer?: Customer
}

export default function CustomerProfile({ customer }: CustomerProfileProps) {
  if (!customer) {
    return (
      <Card className="lg:col-span-1 flex items-center justify-center">
        <CardContent className="text-center text-gray-500">
          <p>เลือกลูกค้าเพื่อดูโปรไฟล์</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle>ข้อมูลลูกค้า</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback>{customer.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{customer.name}</p>
            <p className="text-sm text-gray-500">ID: {customer.id}</p>
          </div>
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-gray-400" />
            <span>{customer.email}</span>
          </div>
          {customer.phone && (
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{customer.phone}</span>
            </div>
          )}
          {customer.address && (
            <p>
              {customer.address}
              {customer.city ? `, ${customer.city}` : ""}
              {customer.postalCode ? ` ${customer.postalCode}` : ""}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

