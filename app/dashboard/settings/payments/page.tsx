"use client"
import { useEffect, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { loadPaymentChannels, paymentChannels, setPaymentChannel, type PaymentChannel } from '@/lib/mock/payment'

export default function PaymentSettingsPage() {
  const [channels, setChannels] = useState(paymentChannels)

  useEffect(() => {
    loadPaymentChannels()
    setChannels({ ...paymentChannels })
  }, [])

  const toggle = (ch: PaymentChannel) => {
    const val = !channels[ch]
    setChannels({ ...channels, [ch]: val })
    setPaymentChannel(ch, val)
  }

  return (
    <div className="container mx-auto max-w-md space-y-4 py-8">
      <h1 className="text-2xl font-bold">ช่องทางรับเงิน</h1>
      {(['bank','promptpay','cash'] as PaymentChannel[]).map(ch => (
        <div key={ch} className="flex items-center space-x-2">
          <Checkbox id={`ch-${ch}`} checked={channels[ch]} onCheckedChange={() => toggle(ch)} />
          <Label htmlFor={`ch-${ch}`}>{ch}</Label>
        </div>
      ))}
      <p className="text-sm text-muted-foreground">บันทึกค่าลงใน mock localStorage</p>
    </div>
  )
}
