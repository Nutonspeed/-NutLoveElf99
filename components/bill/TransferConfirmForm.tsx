"use client"
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

interface TransferInfo {
  bank: string
  time: string
  amount: number
  note?: string
}

interface Props {
  billId: string
  existing?: TransferInfo
}

export default function TransferConfirmForm({ billId, existing }: Props) {
  const { toast } = useToast()
  const [bank, setBank] = useState(existing?.bank || '')
  const [time, setTime] = useState(existing?.time || '')
  const [amount, setAmount] = useState(
    existing?.amount ? existing.amount.toString() : ''
  )
  const [note, setNote] = useState(existing?.note || '')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(!!existing)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/bill/confirm-transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          billId,
          bank,
          time,
          amount: parseFloat(amount) || 0,
          note,
        }),
      })
      if (res.ok) {
        toast({ title: 'บันทึกข้อมูลแล้ว' })
        setSubmitted(true)
      } else {
        toast({ title: 'บันทึกไม่สำเร็จ', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'บันทึกไม่สำเร็จ', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="space-y-1 border p-4 rounded-md">
        <h3 className="font-semibold text-red-600">แจ้งโอนแล้ว</h3>
        <p>ธนาคาร: {bank}</p>
        <p>เวลา: {time}</p>
        <p>จำนวนเงิน: ฿{parseFloat(amount).toLocaleString()}</p>
        {note && <p>หมายเหตุ: {note}</p>}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded-md">
      <h3 className="font-semibold">แจ้งโอน</h3>
      <div>
        <label className="block text-sm mb-1">ธนาคารปลายทาง</label>
        <select
          className="border p-2 w-full"
          value={bank}
          onChange={e => setBank(e.target.value)}
          required
        >
          <option value="">เลือกธนาคาร</option>
          <option value="SCB">SCB</option>
          <option value="KBank">KBank</option>
          <option value="Krungthai">Krungthai</option>
          <option value="BBL">BBL</option>
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">เวลาที่โอน</label>
        <input
          type="datetime-local"
          className="border p-2 w-full"
          value={time}
          onChange={e => setTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-1">จำนวนเงิน</label>
        <input
          type="number"
          step="0.01"
          className="border p-2 w-full"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-1">หมายเหตุเพิ่มเติม</label>
        <input
          className="border p-2 w-full"
          value={note}
          onChange={e => setNote(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="border px-3 py-1"
        disabled={loading}
      >
        {loading ? 'กำลังบันทึก...' : 'บันทึก'}
      </button>
    </form>
  )
}
