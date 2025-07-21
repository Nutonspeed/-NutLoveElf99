"use client"
import ReceiptLayout from '@/components/receipt/ReceiptLayout'
import type { BillData } from '@/lib/hooks/useBillData'
import { Button } from '@/components/ui/buttons/button'
import { Copy, Download } from 'lucide-react'
import PaymentConfirmModal from '@/components/receipt/PaymentConfirmModal'
import FeedbackForm from '@/components/FeedbackForm'
import { useState } from 'react'

export default function ReceiptPageClient({ bill }: { bill: BillData }) {
  const [showFb, setShowFb] = useState(false)
  const [openPay, setOpenPay] = useState(false)
  const copyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const shareLine = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href)
      window.open(`https://social-plugins.line.me/lineit/share?url=${url}`)
    }
  }

  const shareFacebook = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href)
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`)
    }
  }

  const downloadPdf = () => {
    window.open(`/api/receipt/${bill.id}/pdf`, '_blank')
  }

  return (
    <div className="min-h-screen p-4 flex flex-col items-center space-y-4">
      <h1 className="text-lg font-semibold">ใบเสร็จคำสั่งซื้อของคุณ</h1>
      <div className="flex gap-2 print:hidden">
        <Button variant="outline" size="sm" onClick={copyLink}>
          <Copy className="w-4 h-4 mr-2" /> คัดลอกลิงก์
        </Button>
        <Button variant="outline" size="sm" onClick={shareLine}>LINE</Button>
        <Button variant="outline" size="sm" onClick={shareFacebook}>Facebook</Button>
        <Button size="sm" onClick={downloadPdf}>
          <Download className="w-4 h-4 mr-2" /> PDF
        </Button>
        <Button variant="outline" size="sm" onClick={() => setOpenPay(true)}>
          แจ้งโอน
        </Button>
      </div>
      <div className="w-full max-w-xl">
        <ReceiptLayout bill={bill} />
        {!bill.feedback && bill.status === 'delivered' && (
          <div id="feedback" className="mt-4 print:hidden">
            {showFb ? (
              <FeedbackForm billId={bill.id} onSubmitted={() => setShowFb(false)} />
            ) : (
              <Button onClick={() => setShowFb(true)} className="w-full">
                ให้คะแนนความพึงพอใจ
              </Button>
            )}
          </div>
        )}
      </div>
      <PaymentConfirmModal billId={bill.id} open={openPay} onClose={() => setOpenPay(false)} />
    </div>
  )
}
