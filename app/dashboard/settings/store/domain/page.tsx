"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { Label } from "@/components/ui/label"
import {
  loadStoreDomainSetting,
  storeDomainSetting,
  setStoreDomainSetting,
} from "@/lib/mock-store-domain"

export default function StoreDomainPage() {
  const [domain, setDomain] = useState(storeDomainSetting.domain)

  useEffect(() => {
    loadStoreDomainSetting()
    setDomain(storeDomainSetting.domain)
  }, [])

  const handleSave = () => {
    setStoreDomainSetting({ domain })
    alert("บันทึกแล้ว")
  }

  const testConnection = () => {
    if (domain.includes('.')) alert("เชื่อมต่อโดเมนสำเร็จ")
    else alert("ไม่พบ DNS ของโดเมน")
  }

  return (
    <div className="container mx-auto space-y-6 py-8">
      <h1 className="text-2xl font-bold">ตั้งค่าโดเมน</h1>
      <div>
        <Label className="mb-2 block">Domain</Label>
        <Input value={domain} onChange={(e) => setDomain(e.target.value)} />
      </div>
      <div className="space-x-2">
        <Button variant="outline" onClick={testConnection}>
          ทดสอบการเชื่อมต่อ
        </Button>
        <Button onClick={handleSave}>บันทึก</Button>
      </div>
    </div>
  )
}
