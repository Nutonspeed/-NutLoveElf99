import { generateQRUrl } from '@/lib/qr/generate'

export default function BillPaymentQR({ value }: { value: string }) {
  const src = generateQRUrl(value)
  return <img src={src} alt="QR" className="w-32 h-32 mx-auto" />
}
