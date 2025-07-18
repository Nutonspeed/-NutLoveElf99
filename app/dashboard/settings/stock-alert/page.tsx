"use client"
import { useState, useEffect } from 'react'
import { getStockAlert, loadStockAlert, setStockAlert } from '@/lib/mock-stock-settings'
import { Input } from '@/components/ui/inputs/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/buttons/button'

export default function StockAlertSettingsPage() {
  const [enabled, setEnabled] = useState(true)
  const [threshold, setThreshold] = useState(5)

  useEffect(() => {
    loadStockAlert()
    const s = getStockAlert()
    setEnabled(s.enabled)
    setThreshold(s.threshold)
  }, [])

  const handleSave = () => {
    setStockAlert({ enabled, threshold })
    alert('saved')
  }

  return (
    <div className="container mx-auto py-8 space-y-4 max-w-md">
      <h1 className="text-2xl font-bold">ตั้งค่าเตือนสต๊อกต่ำ</h1>
      <div className="flex items-center justify-between">
        <span>เปิดการเตือน</span>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </div>
      <Input type="number" value={threshold} onChange={e=>setThreshold(Number(e.target.value))} placeholder="น้อยกว่า..." />
      <Button onClick={handleSave}>บันทึก</Button>
    </div>
  )
}
