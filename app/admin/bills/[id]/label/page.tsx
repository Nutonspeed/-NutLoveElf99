"use client"
import Link from 'next/link'
import { ArrowLeft, PrinterIcon as Print } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import ShippingLabel from '@/components/shipping/ShippingLabel'
import billDetails from '@/mock/bill.detail.json'

export default function AdminBillLabelPage({ params }: { params: { id: string } }) {
  const bill = (billDetails as any[]).find(b => b.id === params.id)
  if (!bill) {
    return (
      <div className="min-h-screen flex items-center justify-center">ไม่พบบิล</div>
    )
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print()
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="print:hidden flex items-center justify-between mb-4">
        <Link href={`/admin/bills/${params.id}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <Button variant="outline" onClick={handlePrint}>
          <Print className="mr-2 h-4 w-4" /> พิมพ์
        </Button>
      </div>
      <div className="flex justify-center print:block">
        <ShippingLabel
          name={bill.customer.name}
          address={bill.customer.address}
          phone={bill.customer.phone}
          orderId={params.id}
        />
      </div>
    </div>
  )
}
