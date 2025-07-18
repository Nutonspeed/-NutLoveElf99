"use client"
import { useState, useEffect } from "react"
import { setShippingProvider, getShippingProvider } from "@/mock/shipping"

export default function ShippingProviderPage() {
  const [provider, setProvider] = useState(getShippingProvider())

  useEffect(() => {
    setShippingProvider(provider)
  }, [provider])

  return (
    <div className="container mx-auto max-w-md space-y-4 py-8">
      <h1 className="text-2xl font-bold">เลือกผู้ให้บริการขนส่ง</h1>
      <select value={provider} onChange={e=>setProvider(e.target.value as any)} className="border rounded p-2 w-full">
        <option value="Kerry">Kerry</option>
        <option value="Flash">Flash</option>
        <option value="ปณ.">ปณ.</option>
      </select>
      <p className="text-sm text-muted-foreground">เลือกเพื่อบันทึกในเซสชัน mock เท่านั้น</p>
    </div>
  )
}
