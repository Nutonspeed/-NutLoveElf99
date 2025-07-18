"use client"
import { Button } from '@/components/ui/buttons/button'
import { resetStore, generateMockData } from '@/core/mock/store'

export default function MockDevtoolsPage() {
  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Mock Store Devtools</h1>
      <div className="flex gap-2">
        <Button onClick={() => { resetStore(); alert('reset') }}>Reset Store</Button>
        <Button variant="outline" onClick={() => { generateMockData(); alert('generated') }}>สร้าง mock data ชุดใหม่</Button>
      </div>
    </div>
  )
}
