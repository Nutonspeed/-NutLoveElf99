"use client"
import QRCode from 'react-qr-code'

export default function QRCodePlaceholder({ value = 'demo' }: { value?: string }) {
  return (
    <div className="flex h-40 w-40 items-center justify-center bg-white p-2">
      <QRCode value={value} size={152} />
    </div>
  )
}
