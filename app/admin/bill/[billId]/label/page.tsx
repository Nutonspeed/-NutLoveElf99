"use client"
import Link from 'next/link'
import { useRef } from 'react'
import { ArrowLeft, PrinterIcon as Print } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent } from '@/components/ui/cards/card'
import { useBillData } from '@/lib/hooks/useBillData'
import { getShippingProvider } from '@/mock/shipping'
import ShippingProviderLogo from '@/components/ShippingProviderLogo'

function genTracking() {
  const n = Math.floor(100000000 + Math.random() * 900000000)
  return `TH${n}`
}

export default function AdminBillLabelPage({ params }: { params: { billId: string } }) {
  const bill = useBillData(params.billId)
  const labelRef = useRef<HTMLDivElement>(null)

  if (!bill) {
    return (
      <div className="min-h-screen flex items-center justify-center">ไม่พบข้อมูลบิล</div>
    )
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print()
  }

  const tracking = (bill as any).tracking || genTracking()
  const provider = getShippingProvider()
  const itemCount = bill.items.reduce((sum, it) => sum + it.quantity, 0)
  const date = new Date().toLocaleDateString('th-TH')

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="print:hidden flex items-center justify-between mb-4">
        <Link href={`/admin/bill/${bill.id}/view`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <Button variant="outline" onClick={handlePrint}>
          <Print className="mr-2 h-4 w-4" /> พิมพ์
        </Button>
      </div>
      <Card ref={labelRef} className="max-w-sm mx-auto print:border-none">
        <CardContent className="p-4 space-y-2 text-sm w-[80mm]">
          <p className="font-bold text-lg">ใบปะหน้า</p>
          <p>{bill.customer.name}</p>
          <p className="whitespace-pre-line">{bill.customer.address}</p>
          <p>โทร {bill.customer.phone}</p>
          <p className="pt-2">บิล: {bill.id}</p>
          <p>เลขพัสดุ: {tracking}</p>
          <ShippingProviderLogo provider={provider} />
          <p>จำนวน {itemCount} ชิ้น</p>
          <p>วันที่ส่ง {date}</p>
        </CardContent>
      </Card>
    </div>
  )
}
