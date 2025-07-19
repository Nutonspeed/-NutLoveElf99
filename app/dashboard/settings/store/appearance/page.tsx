"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { Label } from "@/components/ui/label"
import {
  loadStoreAppearanceSettings,
  storeAppearanceSettings,
  setStoreAppearanceSettings,
  type StoreAppearanceSettings,
} from "@/lib/mock-store-appearance"

export default function StoreAppearancePage() {
  const [settings, setSettings] = useState<StoreAppearanceSettings>(storeAppearanceSettings)

  useEffect(() => {
    loadStoreAppearanceSettings()
    setSettings({ ...storeAppearanceSettings })
  }, [])

  const handleSave = () => {
    setStoreAppearanceSettings(settings)
    alert("บันทึกแล้ว")
  }

  return (
    <div className="container mx-auto space-y-6 py-8">
      <h1 className="text-2xl font-bold">ตั้งค่ารูปลักษณ์ร้าน</h1>
      <div className="space-y-4">
        <div>
          <Label className="mb-2 block">ธีมร้าน</Label>
          <select
            className="w-full rounded border p-2"
            value={settings.theme}
            onChange={(e) => setSettings({ ...settings, theme: e.target.value as any })}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        <div>
          <Label className="mb-2 block">Font</Label>
          <Input
            value={settings.font}
            onChange={(e) => setSettings({ ...settings, font: e.target.value })}
          />
        </div>
        <div>
          <Label className="mb-2 block">สีแบรนด์</Label>
          <input
            type="color"
            className="h-10 w-20 rounded border"
            value={settings.brandColor}
            onChange={(e) => setSettings({ ...settings, brandColor: e.target.value })}
          />
        </div>
      </div>
      <div className="rounded border p-4" style={{
        fontFamily: settings.font,
        backgroundColor: settings.theme === 'dark' ? '#333' : '#fff',
        color: settings.theme === 'dark' ? '#fff' : '#000',
      }}>
        <div style={{ backgroundColor: settings.brandColor }} className="p-4 text-center text-white">
          ตัวอย่าง Banner
        </div>
        <p className="p-2">ตัวอย่างข้อความในร้าน</p>
      </div>
      <Button onClick={handleSave}>บันทึก</Button>
    </div>
  )
}
