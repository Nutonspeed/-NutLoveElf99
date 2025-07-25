"use client"
import Link from 'next/link'

export default function BillFooterActions({ billId }: { billId: string }) {
  return (
    <div className="space-y-2">
      <Link
        href={`/customer/edit-address?billId=${billId}`}
        className="block border px-3 py-2 text-center rounded"
      >
        แก้ไขที่อยู่จัดส่ง
      </Link>
      <Link
        href={`/bill/feedback/${billId}`}
        className="block border px-3 py-2 text-center rounded"
      >
        แจ้งปัญหา/คำติชม
      </Link>
      <Link
        href={`/thankyou/${billId}`}
        className="block border px-3 py-2 text-center rounded"
      >
        แจ้งโอนแล้ว
      </Link>
    </div>
  )
}
