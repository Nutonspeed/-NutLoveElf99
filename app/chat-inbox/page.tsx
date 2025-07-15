"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import type { Conversation } from "@/types/conversation"
import {
  loadConversations,
  listConversations,
  toggleArchive,
} from "@/lib/mock-conversations"

export default function ChatInboxPage() {
  const [convos, setConvos] = useState<Conversation[]>([])
  const [filter, setFilter] = useState("latest")
  const [showArchived, setShowArchived] = useState(false)

  useEffect(() => {
    loadConversations()
    setConvos([...listConversations()])
  }, [])

  const filtered = convos
    .filter((c) =>
      showArchived ? c.archived : !c.archived,
    )
    .filter((c) => {
      if (filter === "unanswered") return !c.answered && c.status === "open"
      if (filter === "closed") return c.status === "closed"
      return true
    })
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))

  const toggle = (id: string) => {
    toggleArchive(id)
    setConvos([...listConversations()])
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-bold">แชทเพจ</h1>
        <div className="flex items-center justify-between">
          <Tabs value={filter} onValueChange={setFilter} className="w-full">
            <TabsList>
              <TabsTrigger value="unanswered">ยังไม่ตอบ</TabsTrigger>
              <TabsTrigger value="latest">ล่าสุด</TabsTrigger>
              <TabsTrigger value="closed">ปิดแล้ว</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center space-x-2">
            <Switch checked={showArchived} onCheckedChange={setShowArchived} />
            <span className="text-sm">จัดเก็บ</span>
          </div>
        </div>
        <div className="space-y-2">
          {filtered.map((c) => (
            <Card key={c.id} className="flex items-center justify-between">
              <CardHeader>
                <CardTitle>{c.customerName}</CardTitle>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {c.lastMessage}
                </p>
              </CardHeader>
              <CardContent className="space-x-2 flex items-center">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/chat/${c.id}`}>เปิด</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggle(c.id)}
                  className="text-xs"
                >
                  {c.archived ? "ยกเลิก" : "จัดเก็บ"}
                </Button>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <p className="text-center py-8 text-gray-500">ไม่มีข้อมูล</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
