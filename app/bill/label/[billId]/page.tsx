"use client"
import { useEffect, useState } from 'react'
import BillLabel from '@/components/shipping/BillLabel'
import type { FakeBill } from '@/core/mock/fakeBillDB'
import { getBillById } from '@/core/mock/fakeBillDB'
import { Noto_Sans_Thai } from 'next/font/google'

const thaiFont = Noto_Sans_Thai({ subsets: ['thai'], weight: ['400', '700'] })

export default function BillLabelPage({ params }: { params: { billId: string } }) {
  const { billId } = params
  const [bill, setBill] = useState<FakeBill | undefined>()

  useEffect(() => {
    getBillById(billId).then(setBill)
  }, [billId])

  useEffect(() => {
    if (bill && typeof window !== 'undefined') {
      setTimeout(() => window.print(), 500)
    }
  }, [bill])

  if (!bill) {
    return <div className="p-8">ไม่พบบิล</div>
  }

  return (
    <div className={`p-4 print:p-0 bg-white ${thaiFont.className}`}>
      <div className="print:hidden mb-4">
        <button type="button" className="border px-3 py-1" onClick={() => window.print()}>
          พิมพ์
        </button>
      </div>
      <div className="flex justify-center">
        <BillLabel bill={bill} />
      </div>
      <style jsx>{`
        @media print {
          body { margin: 0; background: white; }
          button { display: none; }
        }
      `}</style>
    </div>
  )
}
