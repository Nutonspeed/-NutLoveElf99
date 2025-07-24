"use client"
import { useState } from 'react'
import { addPaymentConfirmation } from '@/core/mock/store/paymentConfirmations'

export default function TransferConfirmForm({ billId }: { billId: string }) {
  const [amount, setAmount] = useState('')
  const [datetime, setDatetime] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amt = parseFloat(amount) || 0
    addPaymentConfirmation({
      billId,
      amount: amt,
      method: 'transfer',
      datetime: datetime || new Date().toISOString(),
    })
    alert('บันทึกข้อมูลแล้ว (mock)')
    setAmount('')
    setDatetime('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded-md">
      <h3 className="font-semibold">แจ้งโอน</h3>
      <div>
        <label className="block text-sm mb-1">จำนวนเงิน</label>
        <input
          type="number"
          step="0.01"
          className="border p-2 w-full"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">วันที่โอน</label>
        <input
          type="datetime-local"
          className="border p-2 w-full"
          value={datetime}
          onChange={e => setDatetime(e.target.value)}
        />
      </div>
      <button type="submit" className="border px-3 py-1">บันทึก</button>
    </form>
  )
}
