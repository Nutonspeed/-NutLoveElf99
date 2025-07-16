"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import CustomerCard from "@/components/admin/customers/CustomerCard"
import { useAuth } from "@/contexts/auth-context"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  mockCustomers,
  getCustomerOrders,
  getCustomerStats,
  updateCustomerPoints,
  setCustomerTier,
  setCustomerMuted,
} from "@/lib/mock-customers"
import {
  loadCustomerNotes,
  listCustomerNotes,
  addCustomerNote,
} from "@/lib/mock-customer-notes"
import {
  loadCustomerTags,
  listCustomerTags,
  addCustomerTag,
} from "@/lib/mock-customer-tags"
import {
  loadFlaggedUsers,
  getFlagStatus,
} from "@/lib/mock-flagged-users"
import { getLatestChatMessage } from "@/lib/mock-chat-messages"
import {
  loadCustomerMedia,
  listCustomerMedia,
  addCustomerMedia,
  type CustomerMediaItem,
} from "@/lib/mock-customer-media"

export default function CustomerDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const { user } = useAuth()
  const router = useRouter()
  const customer = mockCustomers.find((c) => c.id === id)

  useEffect(() => {
    loadCustomerNotes()
    loadCustomerTags()
    loadFlaggedUsers()
    loadCustomerMedia()
  }, [])

  useEffect(() => {
    if (!customer) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Mock Error at customers/[id]')
      }
      router.replace('/admin/customers')
    }
  }, [customer, router])

  if (!customer) return null

  const orders = getCustomerOrders(customer.id)
  const stats = getCustomerStats(customer.id)
  const [pointDelta, setPointDelta] = useState(0)
  const [tierValue, setTierValue] = useState<string>(customer.tier || "Silver")
  const [muted, setMuted] = useState<boolean>(customer.muted ?? false)
  const [noteInput, setNoteInput] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [files, setFiles] = useState<CustomerMediaItem[]>([])
  const latestMessage = getLatestChatMessage(customer.id)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || [])
    newFiles.forEach((file) => addCustomerMedia(customer.id, file))
    setFiles(listCustomerMedia(customer.id))
  }

  useEffect(() => {
    setFiles(listCustomerMedia(customer.id))
  }, [customer])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/customers">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ข้อมูลลูกค้า</h1>
        </div>

        <CustomerCard customer={customer} />
        {getFlagStatus(customer.id) && (
          <Badge variant="destructive">ต้องตรวจสอบก่อนตอบ</Badge>
        )}
        <div className="space-y-2">
          <div>
            <p className="font-semibold">แท็ก</p>
            <div className="flex flex-wrap gap-1 py-1">
              {listCustomerTags(customer.id).map((t) => (
                <Badge key={t.id} variant="secondary">
                  {t.tag}
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2 pt-1">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="border px-2 py-1 rounded"
              />
              <Button
                variant="outline"
                onClick={() => {
                  if (tagInput) {
                    addCustomerTag(customer.id, tagInput)
                    setTagInput("")
                  }
                }}
              >
                เพิ่มแท็ก
              </Button>
            </div>
          </div>
          <div>
            <p className="font-semibold">โน้ต</p>
            <div className="space-y-1 py-1">
              {listCustomerNotes(customer.id).map((n) => (
                <p key={n.id} className="text-sm text-gray-500">
                  {n.note}
                </p>
              ))}
            </div>
            <div className="flex space-x-2 pt-1">
              <input
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                className="border px-2 py-1 rounded"
              />
              <Button
                variant="outline"
                onClick={() => {
                  if (noteInput && noteInput.length < 300) {
                    addCustomerNote(customer.id, noteInput, user?.id || 'admin')
                    setNoteInput("")
                  }
                }}
              >
                เพิ่มโน้ต
              </Button>
          </div>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>ไฟล์แนบ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {files.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {files.map((f) => (
                <img
                  key={f.id}
                  src={f.url}
                  alt={f.name}
                  className="w-full h-24 object-cover rounded"
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              ยังไม่มีไฟล์แนบสำหรับลูกค้ารายนี้
            </p>
          )}
          <div className="pt-2">
            <label htmlFor="file-upload" className="block border-2 border-dashed rounded-md p-4 text-center cursor-pointer">
              เลือกหรือลากไฟล์มาที่นี่
            </label>
            <input id="file-upload" type="file" multiple onChange={handleFileChange} className="hidden" />
          </div>
        </CardContent>
      </Card>
      <div className="text-lg font-semibold">
        ยอดซื้อรวม: ฿{stats.totalSpent.toLocaleString()}
      </div>
        {latestMessage && (
          <div className="text-sm text-gray-600">แชทล่าสุด: {latestMessage.text}</div>
        )}
        <Link href="/chat">
          <Button variant="outline">เปิดใน Chatwoot</Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>แต้มสะสม</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>คะแนนปัจจุบัน: {customer.points ?? 0}</p>
            <div className="flex space-x-2 items-center">
              <input
                type="number"
                className="border px-2 py-1 rounded w-24"
                value={pointDelta}
                onChange={(e) => setPointDelta(Number(e.target.value))}
              />
              <Button
                variant="outline"
                onClick={() => {
                  updateCustomerPoints(customer.id, pointDelta)
                  setPointDelta(0)
                }}
              >
                ปรับแต้ม
              </Button>
            </div>
            {customer.pointHistory && customer.pointHistory.length > 0 && (
              <div className="text-sm space-y-1">
                {customer.pointHistory.map((h, i) => (
                  <p key={i}>
                    {new Date(h.timestamp).toLocaleDateString("th-TH")} :{' '}
                    {h.change > 0 ? `+${h.change}` : h.change}
                  </p>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tier</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              className="border px-2 py-1 rounded"
              value={tierValue}
              onChange={(e) => {
                setTierValue(e.target.value)
                setCustomerTier(customer.id, e.target.value as any)
              }}
            >
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="VIP">VIP</option>
            </select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mute notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <Switch
              checked={muted}
              onCheckedChange={(v) => {
                setMuted(v)
                setCustomerMuted(customer.id, v)
              }}
            />
          </CardContent>
        </Card>

        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">ประวัติการซื้อ</TabsTrigger>
            <TabsTrigger value="stats">สถิติ</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            {orders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>คำสั่งซื้อ</TableHead>
                    <TableHead>วันที่</TableHead>
                    <TableHead>ยอดรวม</TableHead>
                    <TableHead>สถานะ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString("th-TH")}
                      </TableCell>
                      <TableCell>฿{order.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "paid"
                              ? "default"
                              : order.status === "depositPaid"
                                ? "secondary"
                                : order.status === "pendingPayment"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {order.status === "pendingPayment" && "รอชำระเงิน"}
                          {order.status === "depositPaid" && "มัดจำแล้ว"}
                          {order.status === "paid" && "ชำระแล้ว"}
                          {order.status === "cancelled" && "ยกเลิก"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                ยังไม่มีประวัติการซื้อ
              </div>
            )}
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {stats.totalOrders}
                    </p>
                    <p className="text-sm text-gray-600">คำสั่งซื้อทั้งหมด</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      ฿{stats.totalSpent.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">ยอดซื้อรวม</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
