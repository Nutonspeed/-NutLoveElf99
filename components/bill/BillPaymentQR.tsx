import { generateQRUrl } from '@/lib/qr/generate'
import { getStoreProfile } from '@/core/mock/store'

export default function BillPaymentQR({ value }: { value: string }) {
  const src = generateQRUrl(value)
  const store = getStoreProfile()
  return (
    <div className="text-center space-y-1">
      <img src={src} alt="QR" className="w-32 h-32 mx-auto" />
      {store.promptPayId && <p>PromptPay: {store.promptPayId}</p>}
      {store.bankName && (
        <p>
          {store.bankName} {store.accountName} {store.accountNumber}
        </p>
      )}
    </div>
  )
}
