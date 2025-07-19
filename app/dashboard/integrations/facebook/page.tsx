"use client"

import { useState } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"

export default function FacebookIntegrationPage() {
  const [pageId, setPageId] = useState("")
  const [token, setToken] = useState("")

  const handleConnect = () => {
    alert("เชื่อมต่อ Facebook Page สำเร็จ (mock)")
  }

  const handleTest = () => {
    alert(`ส่งข้อความทดสอบไปยัง ${pageId} (mock)`)
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">Facebook Page Chat</h1>
      <Card>
        <CardHeader>
          <CardTitle>เชื่อมต่อเพจ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={pageId}
            onChange={e => setPageId(e.target.value)}
            placeholder="Page ID"
          />
          <Input
            value={token}
            onChange={e => setToken(e.target.value)}
            placeholder="Access Token"
          />
          <div className="flex space-x-2">
            <Button onClick={handleConnect}>เชื่อมต่อ</Button>
            <Button variant="outline" onClick={handleTest}>ทดสอบส่งข้อความ</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
