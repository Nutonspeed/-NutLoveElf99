"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/inputs/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Send } from "lucide-react"
import {
  loadBillNotifyData,
  billNotifySettings,
  billNotifyTemplates,
  billNotifyHistory,
  setChannel,
  setTemplate,
  sendPreview,
} from "@/lib/mock-bill-notify"

export default function BillNotifyPage() {
  const [settings, setSettings] = useState(billNotifySettings)
  const [templates, setTemplates] = useState(billNotifyTemplates)
  const [history, setHistory] = useState(billNotifyHistory)
  const [previewId, setPreviewId] = useState("")
  const [previewStatus, setPreviewStatus] = useState<"dueSoon" | "overdue" | "paid">("dueSoon")

  useEffect(() => {
    loadBillNotifyData()
    setSettings({ ...billNotifySettings })
    setTemplates({ ...billNotifyTemplates })
    setHistory([...billNotifyHistory])
  }, [])

  const toggle = (
    status: "dueSoon" | "overdue" | "paid",
    channel: "email" | "line" | "inApp",
    value: boolean,
  ) => {
    setChannel(status, channel, value)
    setSettings({ ...billNotifySettings })
  }

  const updateTemplate = (status: "dueSoon" | "overdue" | "paid", value: string) => {
    setTemplate(status, value)
    setTemplates({ ...billNotifyTemplates })
  }

  const handlePreview = () => {
    if (!previewId) return
    sendPreview(previewId, previewStatus)
    setHistory([...billNotifyHistory])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ตั้งค่าการแจ้งเตือนบิล</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ช่องทางแจ้งเตือน</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>สถานะบิล</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>LINE</TableHead>
                  <TableHead>In-App</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(
                  [
                    { key: "dueSoon", label: "ใกล้ครบกำหนด" },
                    { key: "overdue", label: "เลยกำหนด" },
                    { key: "paid", label: "ชำระแล้ว" },
                  ] as { key: "dueSoon" | "overdue" | "paid"; label: string }[]
                ).map((row) => (
                  <TableRow key={row.key}>
                    <TableCell>{row.label}</TableCell>
                    {( ["email", "line", "inApp"] as const ).map((ch) => (
                      <TableCell key={ch} className="text-center">
                        <Switch
                          checked={settings[row.key][ch]}
                          onCheckedChange={(v) => toggle(row.key, ch, v)}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ข้อความแจ้งเตือน</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(
              [
                { key: "dueSoon", label: "ใกล้ครบกำหนด" },
                { key: "overdue", label: "เลยกำหนด" },
                { key: "paid", label: "ชำระแล้ว" },
              ] as { key: "dueSoon" | "overdue" | "paid"; label: string }[]
            ).map((t) => (
              <div key={t.key} className="space-y-1">
                <label className="font-medium">{t.label}</label>
                <Textarea
                  value={templates[t.key]}
                  onChange={(e) => updateTemplate(t.key, e.target.value)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ส่งตัวอย่าง</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="รหัสบิล"
              value={previewId}
              onChange={(e) => setPreviewId(e.target.value)}
            />
            <Select value={previewStatus} onValueChange={(v) => setPreviewStatus(v as any)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueSoon">ใกล้ครบกำหนด</SelectItem>
                <SelectItem value="overdue">เลยกำหนด</SelectItem>
                <SelectItem value="paid">ชำระแล้ว</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handlePreview} disabled={!previewId}>
              <Send className="h-4 w-4 mr-2" /> ส่งตัวอย่าง
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ประวัติการแจ้งเตือน</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เวลาส่ง</TableHead>
                  <TableHead>บิล</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>ช่องทาง</TableHead>
                  <TableHead>ข้อความ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((h) => (
                  <TableRow key={h.id}>
                    <TableCell>{new Date(h.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{h.billId}</TableCell>
                    <TableCell>{h.status}</TableCell>
                    <TableCell>{h.channel}</TableCell>
                    <TableCell className="whitespace-pre-wrap">{h.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
