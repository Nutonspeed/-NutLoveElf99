"use client"
import Link from 'next/link'
import customers from '@/mock/customers.json'
import bills from '@/mock/bills.json'
import type { Customer } from '@/types/customer'
import { autoTagCustomers } from '@/lib/auto-tag-customers'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/buttons/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlarmClock } from 'lucide-react'

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const customer = (customers as Customer[]).find(c => c.id === id)
  const customerBills = (bills as any[]).filter(b => b.customerId === id)
  const totalSpent = customerBills.reduce((sum, b) => sum + (b.amount || 0), 0)
  const auto = autoTagCustomers().find(c => c.id === id)

  if (!customer) return <div className="p-4">ไม่พบลูกค้า</div>

  return (
    <div className="p-4 space-y-4">
      {customer.followUpAt && (
        <Alert className="border-yellow-300 bg-yellow-50">
          <AlarmClock className="h-4 w-4 text-yellow-600" />
          <AlertTitle>
            ควรติดต่อลูกค้าภายใน {new Date(customer.followUpAt).toLocaleString('th-TH')}
          </AlertTitle>
          {customer.followUpNote && (
            <AlertDescription>{customer.followUpNote}</AlertDescription>
          )}
        </Alert>
      )}
      <div className="flex items-center gap-2">
        <Link href="/admin/customers">
          <Button variant="outline" size="sm">กลับ</Button>
        </Link>
        <h1 className="text-lg font-bold">{customer.name}</h1>
      </div>
      <div>
        <p>เบอร์: {customer.phone}</p>
        <p>ที่อยู่: {customer.address}</p>
        <p className="space-x-1">
          {customer.tags?.map(t => (
            <Badge key={t} className="bg-blue-100 text-blue-600">{t}</Badge>
          ))}
          {auto?.autoTags.map(t => (
            <Badge
              key={t}
              variant="outline"
              className="bg-gray-100 text-gray-600 border-gray-300"
            >
              {t}
            </Badge>
          ))}
        </p>
        <p>เริ่มใช้บริการ: {new Date(customer.createdAt).toLocaleDateString()}</p>
        <p>ยอดรวมใช้จ่าย: {totalSpent.toLocaleString()} บาท</p>
        <p>จำนวนบิล: {customerBills.length}</p>
      </div>
      <div>
        <h2 className="font-semibold">บิลทั้งหมด</h2>
        <ul className="list-disc pl-5 space-y-1">
          {customerBills.map(b => (
            <li key={b.id}>
              <Link href={`/bill/view/${b.id}`} className="text-blue-600 underline">#{b.id}</Link>
            </li>
          ))}
          {customerBills.length === 0 && <p className="text-sm">ยังไม่มีบิล</p>}
        </ul>
      </div>
      <Link href={`/admin/bill/create?customer=${customer.id}`}>
        <Button>สร้างบิลใหม่</Button>
      </Link>
    </div>
  )
}
