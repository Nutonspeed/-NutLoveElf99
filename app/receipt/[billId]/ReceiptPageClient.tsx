"use client"
import ReceiptLayout from '@/components/receipt/ReceiptLayout'
import type { BillData } from '@/lib/hooks/useBillData'
import { Button } from '@/components/ui/buttons/button'
import { Copy, Download } from 'lucide-react'
import PaymentConfirmModal from '@/components/receipt/PaymentConfirmModal'
import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'

export default function ReceiptPageClient({ bill, meta }: { bill: BillData; meta: { title: string; description: string; image: string } }) {
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
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
      </Head>
      <div className="min-h-screen p-4 flex flex-col items-center space-y-4">
        <h1 className="text-lg font-semibold">ใบเสร็จคำสั่งซื้อของคุณ</h1>
        <p className="text-sm">
          {bill.status === 'paid' ? '✔️ ชำระแล้ว' : '🧾 ยังไม่ชำระ'}
        </p>
      <div className="flex gap-2 print:hidden">
        <Button variant="outline" size="sm" onClick={copyLink}>
          <Copy className="w-4 h-4 mr-2" /> คัดลอกลิงก์
        </Button>
        <Button variant="outline" size="sm" onClick={shareLine}>Share Receipt</Button>
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
          <div id="feedback" className="mt-4 print:hidden text-center">
            <Link href={`/receipt/${bill.id}/feedback`} className="underline text-blue-600">
              ให้คะแนนความพึงพอใจ
            </Link>
          </div>
        )}
      </div>
      <PaymentConfirmModal billId={bill.id} open={openPay} onClose={() => setOpenPay(false)} />
    </div>
    </>
  )
}
