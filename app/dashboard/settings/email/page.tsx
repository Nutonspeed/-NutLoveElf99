"use client"

import { useState } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"

export default function EmailSettingsPage() {
  const [primary, setPrimary] = useState("")
  const [notifyOrder, setNotifyOrder] = useState(true)
  const [notifyTransfer, setNotifyTransfer] = useState(true)
  const [notifyOut, setNotifyOut] = useState(false)

  const save = () => {
    alert("บันทึกการตั้งค่าแล้ว (mock)")
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">Email Notifications</h1>
      <Card>
        <CardHeader>
          <CardTitle>การแจ้งเตือน</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="o" checked={notifyOrder} onCheckedChange={v => setNotifyOrder(Boolean(v))} />
            <label htmlFor="o">อีเมลแจ้งสั่งซื้อ</label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="p" checked={notifyTransfer} onCheckedChange={v => setNotifyTransfer(Boolean(v))} />
            <label htmlFor="p">แจ้งโอนเงิน</label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="out" checked={notifyOut} onCheckedChange={v => setNotifyOut(Boolean(v))} />
            <label htmlFor="out">สินค้าใกล้หมด</label>
          </div>
          <Input
            value={primary}
            onChange={e => setPrimary(e.target.value)}
            placeholder="อีเมลหลักของร้าน"
          />
          <Button onClick={save}>บันทึก</Button>
        </CardContent>
      </Card>
    </div>
  )
}
