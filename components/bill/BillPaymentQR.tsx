"use client"
import { useEffect, useState } from 'react'
import type { StoreProfile } from '@/lib/config'
import { getStoreProfile } from '@/lib/config'
import { getPromptPayQR } from '@/lib/qr/promptpay'

export default function BillPaymentQR() {
  const [profile, setProfile] = useState<StoreProfile | null>(null)
  const [qr, setQr] = useState<string>('')

  useEffect(() => {
    getStoreProfile().then(async p => {
      setProfile(p)
      if (p.promptPayId) {
        const data = await getPromptPayQR(p.promptPayId)
        setQr(`data:image/png;base64,${data}`)
      }
    })
  }, [])

  if (!profile?.promptPayId || !qr) return null

  return (
    <div className="text-center space-y-1">
      <img src={qr} alt="PromptPay QR" className="w-32 h-32 mx-auto" />
      <p className="text-sm">พร้อมเพย์เบอร์นี้</p>
    </div>
  )
}
