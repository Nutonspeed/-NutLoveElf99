"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { Label } from "@/components/ui/label"
import {
  loadStoreSEOSettings,
  storeSEOSettings,
  setStoreSEOSettings,
  type StoreSEOSettings,
} from "@/lib/mock-store-seo"
import { loadStoreDomainSetting, storeDomainSetting } from "@/lib/mock-store-domain"

export default function StoreSEOPage() {
  const [settings, setSettings] = useState<StoreSEOSettings>(storeSEOSettings)
  const [domain, setDomain] = useState(storeDomainSetting.domain)

  useEffect(() => {
    loadStoreSEOSettings()
    setSettings({ ...storeSEOSettings })
    loadStoreDomainSetting()
    setDomain(storeDomainSetting.domain)
  }, [])

  const handleSave = () => {
    setStoreSEOSettings(settings)
    alert("บันทึกแล้ว")
  }

  return (
    <div className="container mx-auto space-y-6 py-8">
      <h1 className="text-2xl font-bold">ตั้งค่า SEO</h1>
      <div className="space-y-4">
        <div>
          <Label className="mb-2 block">Meta Title</Label>
          <Input value={settings.title} onChange={(e) => setSettings({ ...settings, title: e.target.value })} />
        </div>
        <div>
          <Label className="mb-2 block">Meta Description</Label>
          <Input value={settings.description} onChange={(e) => setSettings({ ...settings, description: e.target.value })} />
        </div>
        <div>
          <Label className="mb-2 block">Keywords</Label>
          <Input value={settings.keywords} onChange={(e) => setSettings({ ...settings, keywords: e.target.value })} />
        </div>
      </div>
      <div className="rounded border p-4 space-y-2">
        <p className="text-sm text-green-700">{domain ?? 'example.com'}</p>
        <h2 className="text-lg text-blue-600">{settings.title || 'Title'}</h2>
        <p>{settings.description || 'Description preview'}</p>
      </div>
      <Button onClick={handleSave}>บันทึก</Button>
    </div>
  )
}
