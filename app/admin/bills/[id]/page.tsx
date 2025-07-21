"use client"
import { useEffect, useState } from 'react'
import { getBills, updateBillStatus } from '@/core/mock/store'
import { Button } from '@/components/ui/buttons/button'

export default function AdminBillDetail({ params }: { params: { id: string } }) {
  const bill = getBills().find(b => b.id === params.id)
  const [payments, setPayments] = useState<any[]>([])
  useEffect(() => {
    fetch(`/api/receipt/${params.id}/payment`).then(r => r.json()).then(setPayments)
  }, [params.id])

  if (!bill) return <div className="p-4">ไม่พบบิล</div>

  const confirm = () => {
    updateBillStatus(bill.id, 'paid')
    alert('ยืนยันแล้ว (mock)')
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">บิล {bill.id}</h1>
      <div className="space-y-2">
        <h2 className="font-semibold">แจ้งโอน</h2>
        {payments.length === 0 && <p className="text-sm">ไม่มีข้อมูล</p>}
        {payments.map(p => (
          <div key={p.id} className="border p-2 rounded">
            <p>เวลา: {p.datetime}</p>
            <p>ช่องทาง: {p.method}</p>
            {p.slip && <p className="text-sm text-gray-600">{p.slip}</p>}
          </div>
        ))}
        {bill.status !== 'paid' && payments.length > 0 && (
          <Button onClick={confirm}>ยืนยันรับเงินแล้ว</Button>
        )}
      </div>
    </div>
  )
}
