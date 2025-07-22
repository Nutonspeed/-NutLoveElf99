"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  loadStoreMaintenanceMode,
  storeMaintenanceMode,
  setStoreMaintenanceMode,
  type MaintenanceMode,
} from "@/lib/mock-maintenance-mode"

export default function MaintenanceModePage() {
  const [mode, setMode] = useState<MaintenanceMode>(storeMaintenanceMode)

  useEffect(() => {
    loadStoreMaintenanceMode()
    setMode({ ...storeMaintenanceMode })
  }, [])

  const handleSave = () => {
    setStoreMaintenanceMode(mode)
    alert("บันทึกแล้ว")
  }

  return (
    <div className="container mx-auto space-y-6 py-8">
      <h1 className="text-2xl font-bold">Maintenance Mode</h1>
      <div className="flex items-center gap-4">
        <Label>ปิดปรับปรุง</Label>
        <Switch checked={mode.enabled} onCheckedChange={(v) => setMode({ ...mode, enabled: v })} />
      </div>
      <div>
        <Label className="mb-2 block">ข้อความแจ้งเตือน</Label>
        <Input value={mode.message} onChange={(e) => setMode({ ...mode, message: e.target.value })} />
      </div>
      {mode.enabled && (
        <div className="rounded border p-4 text-center">
          {mode.message}
        </div>
      )}
      <Button onClick={handleSave}>บันทึก</Button>
    </div>
  )
}
