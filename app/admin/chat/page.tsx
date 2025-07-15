"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/inputs/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Badge } from "@/components/ui/badge"
import { mockCustomers } from "@/lib/mock-customers"
import { listChatMessages, getLatestChatMessage } from "@/lib/mock-chat-messages"
import { chatBills, loadChatBills } from "@/lib/mock-chat-bills"
import { formatCurrency, formatThaiDate } from "@/lib/utils"

export default function AdminChatPage() {
  const [customers, setCustomers] = useState(mockCustomers)
  const [search, setSearch] = useState("")
  const [billSearch, setBillSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "draft" | "cancelled">("all")

  useEffect(() => {
    loadChatBills()
    setCustomers([...mockCustomers])
  }, [])

  const filtered = customers.filter(c => {
    const inName = c.name.toLowerCase().includes(search.toLowerCase())
    if (!inName) return false
    if (filter === "all") return true
    const b = chatBills.find(b => b.sessionId === c.id)
    return b ? b.status === filter : false
  })

  const handleBillSearch = () => {
    const b = chatBills.find(b => b.billId === billSearch.trim())
    if (b) {
      const cust = customers.find(c => c.id === b.sessionId)
      if (cust) setSearch(cust.name)
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-wrap gap-2">
        <Input
          placeholder="ค้นหาลูกค้า"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={() => {}} variant="outline">
          ค้นหาลูกค้า
        </Button>
        <Input
          placeholder="รหัสบิล"
          value={billSearch}
          onChange={e => setBillSearch(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={handleBillSearch} variant="outline">
          ค้นหาจากบิล
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>ทั้งหมด</Button>
        <Button variant={filter === "draft" ? "default" : "outline"} onClick={() => setFilter("draft")}>รอชำระ</Button>
        <Button variant={filter === "cancelled" ? "default" : "outline"} onClick={() => setFilter("cancelled")}>ยกเลิก</Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <p className="col-span-full text-center text-sm text-muted-foreground">ยังไม่มีการแชทใด ๆ</p>
        ) : (
          filtered.map(c => {
            const latestMsg = getLatestChatMessage(c.id)
            const bills = chatBills.filter(b => b.sessionId === c.id).sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime())
            const latestBill = bills[0]
            const messages = listChatMessages(c.id).slice(-5)
            return (
              <Card key={c.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{c.name}</span>
                    {latestBill && (
                      <Badge variant="secondary">{latestBill.status === 'draft' ? 'รอชำระ' : latestBill.status === 'paid' ? 'จ่ายแล้ว' : 'ยกเลิก'}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {latestMsg ? (
                    <p className="text-sm text-gray-600">"{latestMsg.text}"</p>
                  ) : (
                    <p className="text-sm text-gray-600">ยังไม่มีการแชทใด ๆ</p>
                  )}
                  {latestBill && (
                    <div className="text-sm flex items-center gap-2">
                      <Link href={`/chat-bill/${latestBill.billId}`} className="underline">
                        บิลล่าสุด {latestBill.billId}
                      </Link>
                      <span>{formatCurrency(latestBill.total)}</span>
                    </div>
                  )}
                  {bills.length > 0 && (
                    <div className="mt-2 space-y-1 text-xs">
                      <p className="font-medium">ประวัติบิล</p>
                      {bills.slice(0,5).map(b => (
                        <div key={b.billId} className="flex justify-between">
                          <span>{formatThaiDate(b.createdAt)}</span>
                          <span>{b.billId}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {messages.length > 0 && (
                    <div className="mt-2 space-y-1 text-xs">
                      <p className="font-medium">แชทล่าสุด</p>
                      {messages.map(m => (
                        <div key={m.id} className="flex justify-between">
                          <span>{formatThaiDate(m.createdAt)}</span>
                          <span>{m.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
