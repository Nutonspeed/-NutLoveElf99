"use client"
import { useEffect, useState } from 'react'
import { generateQRUrl } from '@/lib/qr/generate'
import type { StoreProfile } from '@/lib/config'
import { getStoreProfile } from '@/lib/config'

export default function BillQRSection({ total }: { total: number }) {
  const [profile, setProfile] = useState<StoreProfile | null>(null)
  const src = generateQRUrl(`PAY:${total}`)

  useEffect(() => {
    getStoreProfile().then(setProfile)
  }, [])

  return (
    <div className="text-center space-y-2">
      <p className="font-semibold">ยอดโอนทั้งหมด</p>
      <p className="text-xl font-bold">฿{total.toLocaleString()}</p>
      <img src={src} alt="QR" className="w-40 h-40 mx-auto" />
      {profile && (
        <div className="text-sm space-y-1">
          {profile.promptPayId && <p>PromptPay: {profile.promptPayId}</p>}
          {profile.bankName && (
            <p>
              {profile.bankName} {profile.accountName} {profile.accountNumber}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
