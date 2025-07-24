"use client"
import { generateQRUrl } from '@/lib/qr/generate'

export default function BillQRSection({ total }: { total: number }) {
  const src = generateQRUrl(`PAY:${total}`)
  return (
    <div className="text-center space-y-2">
      <p className="font-semibold">ยอดโอนทั้งหมด</p>
      <p className="text-xl font-bold">฿{total.toLocaleString()}</p>
      <img src={src} alt="QR" className="w-40 h-40 mx-auto" />
      <p className="text-sm text-gray-600">สแกนเพื่อโอน (mock)</p>
    </div>
  )
}
