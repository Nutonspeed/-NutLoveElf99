"use client"
import Link from 'next/link'
import customers from '@/mock/customers.json'
import bills from '@/mock/bills.json'
import type { Customer } from '@/types/customer'
import { Button } from '@/components/ui/buttons/button'

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const customer = (customers as Customer[]).find(c => c.id === id)
  const customerBills = (bills as any[]).filter(b => b.customerId === id)
  const totalSpent = customerBills.reduce((sum, b) => sum + (b.amount || 0), 0)

  if (!customer) return <div className="p-4">ไม่พบลูกค้า</div>

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/admin/customers">
          <Button variant="outline" size="sm">กลับ</Button>
        </Link>
        <h1 className="text-lg font-bold">{customer.name}</h1>
      </div>
      <div>
        <p>เบอร์: {customer.phone}</p>
        <p>ที่อยู่: {customer.address}</p>
        <p>แท็ก: {customer.tags?.join(', ')}</p>
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
