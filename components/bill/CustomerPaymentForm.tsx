"use client"
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { uploadSlip } from '@/lib/upload/slipUploader'
import { useBillStore } from '@/core/store'
import type { PaymentConfirmation } from '@/types/payment-confirmation'
import PaymentConfirmationCard from './PaymentConfirmationCard'

interface Props {
  billId: string
  existing?: PaymentConfirmation | null
  autofillAmount?: number
}

export default function CustomerPaymentForm({ billId, existing, autofillAmount }: Props) {
  const { toast } = useToast()
  const store = useBillStore()
  const [amount, setAmount] = useState(existing?.amountTransferred?.toString() || (autofillAmount?.toString() || ''))
  const [date, setDate] = useState(existing?.transferDate || new Date().toISOString().slice(0,10))
  const [slip, setSlip] = useState<File | null>(null)
  const [slipPreview, setSlipPreview] = useState(existing?.transferSlipUrl || '')
  const [note, setNote] = useState(existing?.customerNote || '')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(!!existing)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) {
      setSlip(f)
      const reader = new FileReader()
      reader.onload = () => setSlipPreview(reader.result as string)
      reader.readAsDataURL(f)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!slip && !slipPreview) {
      toast({ title: 'กรุณาแนบสลิป' })
      return
    }
    setLoading(true)
    try {
      const slipUrl = slip ? await uploadSlip(slip) : slipPreview
      const payload: PaymentConfirmation = {
        amountTransferred: parseFloat(amount) || 0,
        transferDate: date,
        transferSlipUrl: slipUrl,
        customerNote: note,
      }
      const res = await fetch('/api/bill/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billId, ...payload }),
      })
      if (res.ok) {
        store.updateBill(billId, { confirmation: payload })
        store.updateProductionStatus(billId, 'payment-confirmed-by-customer')
        toast({ title: 'แจ้งโอนสำเร็จ! รอแอดมินตรวจสอบ' })
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
    return <PaymentConfirmationCard confirmation={{
      amountTransferred: parseFloat(amount) || 0,
      transferDate: date,
      transferSlipUrl: slipPreview,
      customerNote: note,
    }} />
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded-md">
      <h3 className="font-semibold">แจ้งโอนเงิน</h3>
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
        <label className="block text-sm mb-1">วันที่โอน</label>
        <input
          type="date"
          className="border p-2 w-full"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-1">สลิปการโอน</label>
        <input type="file" accept="image/*" onChange={handleFile} />
        {slipPreview && <img src={slipPreview} alt="slip" className="mt-2 w-40" />}
      </div>
      <div>
        <label className="block text-sm mb-1">หมายเหตุเพิ่มเติม</label>
        <textarea
          className="border p-2 w-full"
          value={note}
          onChange={e => setNote(e.target.value)}
        />
      </div>
      <button type="submit" className="border px-3 py-1" disabled={loading}>
        {loading ? 'กำลังบันทึก...' : 'ยืนยันการชำระเงิน'}
      </button>
    </form>
  )
}
