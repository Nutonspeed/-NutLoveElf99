import Image from 'next/image'

interface QRDisplayProps {
  total: number
  qrImage?: string
}

export default function QRDisplay({ total, qrImage }: QRDisplayProps) {
  const src = qrImage || '/placeholder.svg'
  return (
    <div className="border p-4 rounded-md shadow text-center space-y-2">
      <p className="font-medium text-sm">ยอดที่ต้องชำระโดยประมาณ</p>
      <p className="text-xl font-bold">฿{total.toLocaleString()}</p>
      <Image
        src={src}
        alt="PromptPay QR"
        width={160}
        height={160}
        className="mx-auto"
      />
      <p className="text-sm text-gray-600">สแกนชำระผ่านแอปธนาคาร</p>
    </div>
  )
}
