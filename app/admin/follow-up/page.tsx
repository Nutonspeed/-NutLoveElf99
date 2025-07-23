"use client"
import Link from 'next/link'
import customers from '@/mock/customers.json'
import type { Customer } from '@/types/customer'
import { Button } from '@/components/ui/buttons/button'

const list = customers as Customer[]
const today = new Date()
const followUps = list
  .filter(c => c.followUpAt && new Date(c.followUpAt) <= today)
  .sort(
    (a, b) =>
      new Date(a.followUpAt || '').getTime() -
      new Date(b.followUpAt || '').getTime()
  )

export default function FollowUpPage() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">ลูกค้าที่ต้องติดตามวันนี้</h1>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="text-left font-medium p-2">ชื่อ</th>
            <th className="text-left font-medium p-2">ติดตามเมื่อ</th>
            <th className="text-left font-medium p-2">หมายเหตุ</th>
            <th className="text-left font-medium p-2">การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          {followUps.map(c => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{new Date(c.followUpAt!).toLocaleString('th-TH')}</td>
              <td className="p-2">{c.followUpNote}</td>
              <td className="p-2">
                <Link href={`/admin/customers/${c.id}`}>
                  <Button variant="outline" size="sm">ดู</Button>
                </Link>
              </td>
            </tr>
          ))}
          {followUps.length === 0 && (
            <tr>
              <td colSpan={4} className="p-2 text-center text-muted-foreground">
                ไม่มีลูกค้าที่ต้องติดตาม
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
