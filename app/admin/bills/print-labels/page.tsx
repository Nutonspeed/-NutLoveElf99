"use client"
import { useEffect, useState } from 'react'
import BillLabel from '@/components/shipping/BillLabel'
import type { FakeBill } from '@/core/mock/fakeBillDB'
import { getBillById } from '@/core/mock/fakeBillDB'

export default function PrintBillLabelsPage({ searchParams }: { searchParams: { ids?: string } }) {
  const [bills, setBills] = useState<FakeBill[]>([])

  useEffect(() => {
    if (searchParams.ids) {
      const idList = searchParams.ids.split(',')
      Promise.all(idList.map(id => getBillById(id))).then(res => setBills(res.filter(Boolean) as FakeBill[]))
    }
  }, [searchParams.ids])

  useEffect(() => {
    if (bills.length > 0 && typeof window !== 'undefined') {
      setTimeout(() => window.print(), 500)
    }
  }, [bills])

  if (bills.length === 0) {
    return <div className="p-8">ไม่พบข้อมูล</div>
  }

  return (
    <div className="p-4 space-y-4 print:p-0">
      {bills.map(bill => (
        <BillLabel key={bill.id} bill={bill} />
      ))}
      <style jsx>{`
        @media print { body { margin: 0; } }
      `}</style>
    </div>
  )
}
