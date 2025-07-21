"use client"
import { useMemo } from 'react'
import ModalWrapper from '@/components/ui/ModalWrapper'
import { Button } from '@/components/ui/buttons/button'
import { mockBills } from '@/lib/bills'
import { mockOrders } from '@/lib/mock-orders'
import type { Customer } from '@/lib/mock-customers'
import { formatThaiDate } from '@/lib/utils'

export default function CustomerPopup({
  customer,
  onClose,
}: {
  customer: Customer | null
  onClose: () => void
}) {
  const bills = useMemo(() => {
    if (!customer) return []
    const orderIds = mockOrders
      .filter(o => o.customerId === customer.id)
      .map(o => o.id)
    return mockBills
      .filter(b => orderIds.includes(b.orderId))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3)
  }, [customer])

  if (!customer) return null

  return (
    <ModalWrapper open={!!customer} onClose={onClose}>
      <div className="w-80 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold">{customer.name}</h2>
            {customer.phone && <p className="text-sm">โทร: {customer.phone}</p>}
          </div>
          <Button size="sm" variant="outline" onClick={onClose}>ปิด</Button>
        </div>
        <div>
          <h3 className="font-semibold mb-2">บิลล่าสุด</h3>
          <ul className="text-sm space-y-1">
            {bills.map(bill => (
              <li key={bill.id} className="flex justify-between">
                <span>#{bill.id}</span>
                <span>{formatThaiDate(bill.createdAt)}</span>
              </li>
            ))}
            {bills.length === 0 && (
              <li className="text-gray-500">ไม่มีประวัติบิล</li>
            )}
          </ul>
        </div>
      </div>
    </ModalWrapper>
  )
}
