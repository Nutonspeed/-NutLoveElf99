"use client"
import { useState } from 'react'
import { getPointExpiry, setPointExpiry } from '@/core/mock/store'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'

export default function PointPolicyPage() {
  const [days, setDays] = useState(getPointExpiry())
  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Point Expiry Policy</h1>
      <div className="flex space-x-2 items-center">
        <Input type="number" value={days} onChange={e=>setDays(Number(e.target.value))} className="w-24" />
        <span>วัน</span>
        <Button onClick={() => setPointExpiry(days)}>บันทึก</Button>
      </div>
    </div>
  )
}
