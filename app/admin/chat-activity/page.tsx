"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  chatActivity,
  loadChatActivity,
  type ChatActivity,
  CHAT_ACTIVITY_EVENT,
} from "@/lib/mock-chat-activity"
import { mockOrders } from "@/lib/mock-orders"
import { useToast } from "@/hooks/use-toast"
import { mockCustomers } from "@/lib/mock-customers"

export default function AdminChatActivityPage() {
  const [customerId, setCustomerId] = useState("all")
  const [activity, setActivity] = useState<ChatActivity[]>([])
  const { toast } = useToast()

  useEffect(() => {
    loadChatActivity()
    setActivity([...chatActivity])
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ChatActivity>).detail
      setActivity((prev) => {
        const updated = [...prev, detail]
        const orders = mockOrders.filter((o) => o.customerId === detail.customerId)
        const hasPending = orders.some(
          (o) => o.status !== "paid" && o.status !== "completed"
        )
        if (detail.action === "customer_message" && hasPending) {
          toast({
            title: "ข้อความใหม่",
            description: `${getName(detail.customerId)} ส่งข้อความใหม่`,
          })
        }
        if (detail.action === "open_chat") {
          const previouslyOpened = prev.some(
            (a) => a.customerId === detail.customerId && a.action === "open_chat"
          )
          if (previouslyOpened) {
            toast({
              title: "ลูกค้าเปิดแชทอีกครั้ง",
              description: getName(detail.customerId),
            })
          }
        }
        return updated
      })
    }
    window.addEventListener(CHAT_ACTIVITY_EVENT, handler)
    return () => window.removeEventListener(CHAT_ACTIVITY_EVENT, handler)
  }, [])

  const filtered =
    customerId === "all"
      ? activity
      : activity.filter((a) => a.customerId === customerId)

  const getName = (id: string) =>
    mockCustomers.find((c) => c.id === id)?.name || id

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">กิจกรรมแชท</h1>
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <span className="text-sm">ลูกค้า</span>
          <Select value={customerId} onValueChange={setCustomerId}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              {mockCustomers.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>บันทึก ({filtered.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เวลา</TableHead>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>การกระทำ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>{new Date(a.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{getName(a.customerId)}</TableCell>
                    <TableCell>{a.action}</TableCell>
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
