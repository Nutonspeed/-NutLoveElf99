"use client"
import type { PaymentConfirmation } from '@/types/payment-confirmation'

export default function PaymentConfirmationCard({ confirmation }: { confirmation: PaymentConfirmation }) {
  return (
    <div className="space-y-1 border p-4 rounded-md">
      <h3 className="font-semibold text-red-600">แจ้งโอนแล้ว</h3>
      <p>จำนวนเงิน: ฿{confirmation.amountTransferred.toLocaleString()}</p>
      <p>วันที่โอน: {confirmation.transferDate}</p>
      {confirmation.customerNote && <p>หมายเหตุ: {confirmation.customerNote}</p>}
      {confirmation.transferSlipUrl && (
        <img src={confirmation.transferSlipUrl} alt="slip" className="w-40" />
      )}
      <p className="text-sm text-gray-500">
        {confirmation.verified ? 'ตรวจสอบแล้ว' : 'รอตรวจสอบ'}
      </p>
    </div>
  )
}
