"use client"
import { useEffect } from 'react'
import QuotePreview from '@/components/QuotePreview'
import { getQuotation, updateQuotationStatus } from '@/lib/mock-quotations'
import type { Quotation } from '@/types/quotation'

export default function QuotePage({ params }: { params: { id: string } }) {
  const quote: Quotation | undefined = getQuotation(params.id)

  useEffect(() => {
    if (quote && quote.status === 'sent') {
      updateQuotationStatus(quote.id, 'viewed')
    }
  }, [quote])

  if (!quote) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>ไม่พบใบเสนอราคานี้ กรุณาตรวจสอบลิงก์</p>
      </div>
    )
  }

  const handleDownload = () => {
    alert('ดาวน์โหลดใบเสนอราคา (mock)')
  }

  return (
    <div className="min-h-screen p-4 space-y-4">
      <QuotePreview quotation={quote} />
      <button
        onClick={handleDownload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ดาวน์โหลดใบเสนอราคา (mock)
      </button>
    </div>
  )
}
