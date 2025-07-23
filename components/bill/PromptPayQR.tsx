'use client'

import generatePayload from 'promptpay-qr'
import QRCode from 'react-qr-code'

interface Props {
  amount: number
  merchantId?: string
}

export default function PromptPayQR({ amount, merchantId = '1234567890123' }: Props) {
  const payload = generatePayload(merchantId, { amount })
  return (
    <div className="w-40 h-40 bg-white p-1 flex items-center justify-center">
      <QRCode value={payload} size={150} />
    </div>
  )
}
