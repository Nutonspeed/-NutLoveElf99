"use client"
import ReceiptLayout from '@/components/receipt/ReceiptLayout'
import type { BillData } from '@/lib/hooks/useBillData'
import { Button } from '@/components/ui/buttons/button'
import { Copy } from 'lucide-react'

export default function ReceiptPageClient({ bill }: { bill: BillData }) {
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
      <div className="w-full max-w-xl">
        <ReceiptLayout bill={bill} />
      </div>
    </div>
  )
}
