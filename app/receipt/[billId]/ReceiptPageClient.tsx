"use client"
import ReceiptLayout from '@/components/receipt/ReceiptLayout'
import type { AdminBill } from '@/mock/bills'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/buttons/button'
import { Copy } from 'lucide-react'
import PaymentConfirmationPopup from '@/components/PaymentConfirmationPopup'
import { getPaymentConfirmations } from '@/core/mock/store'

export default function ReceiptPageClient({ bill }: { bill: AdminBill }) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const exist = getPaymentConfirmations(bill.id)
    if (exist.length > 0) setSubmitted(true)
  }, [bill.id])
  const copyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen p-4 flex flex-col items-center space-y-4">
      <h1 className="text-lg font-semibold">ใบเสร็จคำสั่งซื้อของคุณ</h1>
      <Button variant="outline" size="sm" onClick={copyLink} className="print:hidden">
        <Copy className="w-4 h-4 mr-2" /> คัดลอกลิงก์
      </Button>
      <div className="w-full max-w-xl space-y-4">
        <ReceiptLayout bill={bill} />
        {['pending','unpaid'].includes(bill.status) && !submitted && (
          <div className="text-center">
            <Button onClick={() => setOpen(true)}>แจ้งชำระเงิน</Button>
          </div>
        )}
      </div>
      <PaymentConfirmationPopup
        billId={bill.id}
        open={open}
        onClose={() => setOpen(false)}
        onSubmitted={() => setSubmitted(true)}
      />
    </div>
  )
}
