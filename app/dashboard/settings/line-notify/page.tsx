"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { loadLineToken, setLineToken, sendLineNotify } from "@/lib/mock-line-notify"

export default function LineNotifySettingsPage() {
  const [token, setToken] = useState("")

  useEffect(() => {
    setToken(loadLineToken())
  }, [])

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">LINE Notify</h1>
      <Input placeholder="Token" value={token} onChange={(e) => setToken(e.target.value)} />
      <div className="space-x-2">
        <Button onClick={() => setLineToken(token)}>บันทึก</Button>
        <Button variant="secondary" onClick={() => sendLineNotify("ทดสอบการแจ้งเตือน")}>ทดสอบยิงข้อความ</Button>
      </div>
    </div>
  )
}
