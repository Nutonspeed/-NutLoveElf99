"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import CustomerCard from "@/components/admin/customers/CustomerCard"
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
import { mockBills } from "@/lib/mock-bills"
import { mockClaims } from "@/lib/mock-claims"
import {
  loadSofaSizes,
  listSofaSizes,
  addSofaSize,
  removeSofaSize,
  type SofaSize,
} from "@/lib/mock-sofa-size"

export default function CustomerDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const router = useRouter()
  const customer = mockCustomers.find((c) => c.id === id)

  useEffect(() => {
    loadCustomerNotes()
    loadCustomerTags()
    loadFlaggedUsers()
    loadSofaSizes()
    setSizes(listSofaSizes(id))
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
  const latestMessage = getLatestChatMessage(customer.id)
  const bills = mockBills.filter((b) => orders.some((o) => o.id === b.orderId))
  const claims = mockClaims.filter((c) => orders.some((o) => o.id === c.orderId))
  const [sizes, setSizes] = useState<SofaSize[]>(listSofaSizes(id))
  const [newSize, setNewSize] = useState({
    width: "",
    depth: "",
    height: "",
    note: "",
  })

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

        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">ข้อมูลทั่วไป</TabsTrigger>
            <TabsTrigger value="bills">บิล</TabsTrigger>
            <TabsTrigger value="claims">เคลม</TabsTrigger>
            <TabsTrigger value="sizes">ขนาดโซฟา</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
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
                      if (noteInput) {
                        addCustomerNote(customer.id, noteInput)
                        setNoteInput("")
                      }
                    }}
                  >
                    เพิ่มโน้ต
                  </Button>
                </div>
              </div>
            </div>
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
                  <div className="text-center py-8 text-gray-500">ยังไม่มีประวัติการซื้อ</div>
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
          </TabsContent>

          <TabsContent value="bills">
            {bills.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bills.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell>{b.id}</TableCell>
                      <TableCell>{b.orderId}</TableCell>
                      <TableCell>{b.status}</TableCell>
                      <TableCell>{b.dueDate || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">ไม่พบข้อมูล</div>
            )}
          </TabsContent>

          <TabsContent value="claims">
            {claims.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>เหตุผล</TableHead>
                    <TableHead>สถานะ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claims.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>{c.orderId}</TableCell>
                      <TableCell>{c.reason}</TableCell>
                      <TableCell>{c.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">ไม่พบข้อมูล</div>
            )}
          </TabsContent>

          <TabsContent value="sizes" className="space-y-2">
            {sizes.map((s) => (
              <div key={s.id} className="flex items-center space-x-2">
                <p className="flex-1 text-sm">
                  {s.width}x{s.depth}x{s.height} ซม. {s.note && `(${s.note})`}
                </p>
                <Button variant="outline" size="sm" onClick={() => {
                  removeSofaSize(s.id)
                  setSizes(listSofaSizes(id))
                }}>ลบ</Button>
              </div>
            ))}
            <div className="grid grid-cols-4 gap-2">
              <input
                placeholder="กว้าง"
                value={newSize.width}
                onChange={(e) => setNewSize({ ...newSize, width: e.target.value })}
                className="border px-2 py-1 rounded"
              />
              <input
                placeholder="ลึก"
                value={newSize.depth}
                onChange={(e) => setNewSize({ ...newSize, depth: e.target.value })}
                className="border px-2 py-1 rounded"
              />
              <input
                placeholder="สูง"
                value={newSize.height}
                onChange={(e) => setNewSize({ ...newSize, height: e.target.value })}
                className="border px-2 py-1 rounded"
              />
              <input
                placeholder="หมายเหตุ"
                value={newSize.note}
                onChange={(e) => setNewSize({ ...newSize, note: e.target.value })}
                className="border px-2 py-1 rounded"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => {
                if (!newSize.width || !newSize.depth || !newSize.height) return
                addSofaSize(id, {
                  width: Number(newSize.width),
                  depth: Number(newSize.depth),
                  height: Number(newSize.height),
                  note: newSize.note,
                })
                setSizes(listSofaSizes(id))
                setNewSize({ width: "", depth: "", height: "", note: "" })
              }}
            >
              เพิ่มขนาด
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
