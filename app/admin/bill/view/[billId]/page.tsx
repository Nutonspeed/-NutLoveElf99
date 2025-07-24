"use client"
import { useEffect, useState } from 'react'
import AdminStatusEditor from '@/components/AdminStatusEditor'
import BillTimeline from '@/components/bill/BillTimeline'
import { formatDateThai } from '@/lib/formatDateThai'

export default function ViewPage({ params }: { params: { billId: string } }) {
  const [bill, setBill] = useState<any | null>(null)

  useEffect(() => {
    fetch('/mock/store/bills.json')
      .then(r => r.json())
      .then((list: any[]) => {
        const found = list.find(b => b.id === params.billId)
        setBill(found || null)
      })
      .catch(() => setBill(null))
  }, [params.billId])

  if (!bill) {
    return <div className="p-4 text-center">ไม่พบบิลนี้</div>
  }

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-xl font-bold">บิล {bill.id}</h1>
      <p>
        สถานะ:{' '}
        <span className={bill.status === 'แจ้งโอนแล้ว' ? 'text-red-600 font-bold' : ''}>
          {bill.status}
        </span>
      </p>
      <div className="space-y-2">
        <h2 className="font-medium">สถานะงานผลิต</h2>
        <AdminStatusEditor billId={bill.id} step={bill.productionStatus || 'waiting'} />
        <BillTimeline status={bill.productionStatus || 'waiting'} />
        {bill.productionTimeline?.length > 0 && (
          <p className="text-xs text-gray-500">
            อัปเดตล่าสุด:{' '}
            {formatDateThai(
              bill.productionTimeline[bill.productionTimeline.length - 1].timestamp
            )}
          </p>
        )}
      </div>
      {bill.transferConfirmation && (
        <div className="border p-2 rounded">
          <p>ธนาคาร: {bill.transferConfirmation.bank}</p>
          <p>เวลา: {bill.transferConfirmation.time}</p>
          <p>จำนวนเงิน: ฿{bill.transferConfirmation.amount}</p>
          {bill.transferConfirmation.note && <p>หมายเหตุ: {bill.transferConfirmation.note}</p>}
        </div>
      )}
    </div>
  )
}
