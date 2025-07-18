"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { Label } from "@/components/ui/label"
import {
  loadStoreBannerSettings,
  storeBannerSettings,
  setStoreBannerSettings,
  type StoreBannerSettings,
} from "@/lib/mock-store-banner"

export default function StoreBannerPage() {
  const [settings, setSettings] = useState<StoreBannerSettings>(storeBannerSettings)

  useEffect(() => {
    loadStoreBannerSettings()
    setSettings({ ...storeBannerSettings })
  }, [])

  const handleSave = () => {
    setStoreBannerSettings(settings)
    alert("บันทึกแล้ว")
  }

  return (
    <div className="container mx-auto space-y-6 py-8">
      <h1 className="text-2xl font-bold">จัดการแบนเนอร์</h1>
      <div className="space-y-4">
        <div>
          <Label className="mb-2 block">Desktop Banner URL</Label>
          <Input value={settings.desktop} onChange={(e) => setSettings({ ...settings, desktop: e.target.value })} />
        </div>
        <div>
          <Label className="mb-2 block">Mobile Banner URL</Label>
          <Input value={settings.mobile} onChange={(e) => setSettings({ ...settings, mobile: e.target.value })} />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="relative h-32 w-64 border">
          <Image src={settings.desktop} alt="desktop" fill className="object-cover" />
        </div>
        <div className="relative h-32 w-32 border">
          <Image src={settings.mobile} alt="mobile" fill className="object-cover" />
        </div>
      </div>
      <Button onClick={handleSave}>บันทึก</Button>
    </div>
  )
}
