"use client"
import { useEffect, useState } from 'react'
import { getPayments, verifyPayment, rejectPayment, type Payment } from '@/lib/mock/payment'
import { Button } from '@/components/ui/buttons/button'
import EmptyState from '@/components/EmptyState'

export default function PaymentVerifyPage() {
  const [list, setList] = useState<Payment[]>([])

  useEffect(() => {
    setList([...getPayments()])
  }, [])

  const handleVerify = (id: string) => {
    verifyPayment(id)
    setList([...getPayments()])
  }

  const handleReject = (id: string) => {
    rejectPayment(id)
    setList([...getPayments()])
  }

  if (list.length === 0) return <EmptyState title="ไม่มีการแจ้งชำระ" />

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">ตรวจสอบการชำระ</h1>
      {list.map(p => (
        <div key={p.orderId} className="border rounded p-4 space-y-1">
          <p>Order: {p.orderId}</p>
          <p>จำนวน: ฿{p.amount.toLocaleString()}</p>
          <div className="space-x-2">
            {!p.verified && (
              <Button size="sm" onClick={() => handleVerify(p.orderId)}>ยืนยัน</Button>
            )}
            <Button variant="destructive" size="sm" onClick={() => handleReject(p.orderId)}>
              ปฏิเสธ
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
