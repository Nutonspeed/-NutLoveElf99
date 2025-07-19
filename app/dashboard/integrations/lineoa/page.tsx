"use client"

import { useState } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"

export default function LineOAIntegrationPage() {
  const [token, setToken] = useState("")
  const [enabled, setEnabled] = useState(false)

  const handleTest = () => {
    alert("ส่ง broadcast ทดสอบ (mock)")
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">LINE OA</h1>
      <Card>
        <CardHeader>
          <CardTitle>ตั้งค่า</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="enabled" checked={enabled} onCheckedChange={v => setEnabled(Boolean(v))} />
            <label htmlFor="enabled">เปิดใช้ในระบบ</label>
          </div>
          <Input
            value={token}
            onChange={e => setToken(e.target.value)}
            placeholder="LINE OA Token"
          />
          <Button onClick={handleTest}>ทดสอบ broadcast</Button>
        </CardContent>
      </Card>
    </div>
  )
}
