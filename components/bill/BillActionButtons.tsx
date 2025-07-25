"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/button'

export default function BillActionButtons({ billId }: { billId: string }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
      <Link href={`/thankyou/${billId}`} className="flex-1">
        <Button className="w-full">แจ้งโอน</Button>
      </Link>
      <Link href={`/customer/edit-address?billId=${billId}`} className="flex-1">
        <Button variant="outline" className="w-full">แก้ที่อยู่</Button>
      </Link>
      <a href="#timeline" className="flex-1">
        <Button variant="outline" className="w-full">ติดตามสถานะ</Button>
      </a>
    </div>
  )
}
