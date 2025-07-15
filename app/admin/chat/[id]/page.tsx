"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/inputs/input"
import type { ChatMessageEntry } from "@/types/chat-message"
import {
  loadChatMessages,
  listChatMessages,
  pinChatMessage,
  addLabelToMessage,
} from "@/lib/mock-chat-messages"
import { loadConversations, listConversations } from "@/lib/mock-conversations"

export default function ChatMessagesPage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const [messages, setMessages] = useState<ChatMessageEntry[]>([])
  const [labelInput, setLabelInput] = useState<string>("")

  useEffect(() => {
    loadChatMessages()
    loadConversations()
    setMessages([...listChatMessages(id)])
  }, [id])

  const refresh = () => setMessages([...listChatMessages(id)])

  const pinned = messages.find((m) => m.pinned)
  const others = messages.filter((m) => !m.pinned)

  const addLabel = (msgId: string) => {
    if (!labelInput) return
    addLabelToMessage(id, msgId, labelInput)
    setLabelInput("")
    refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/chat">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ข้อความ</h1>
        </div>
        {pinned && (
          <div className="border rounded-md p-4 bg-yellow-50 space-y-2">
            <p className="font-semibold">📌 ข้อความที่ปักหมุด</p>
            <p>{pinned.text}</p>
            <div className="flex flex-wrap gap-1">
              {pinned.labels?.map((l) => (
                <Badge key={l} variant="secondary">
                  {l}
                </Badge>
              ))}
            </div>
          </div>
        )}
        <div className="space-y-4">
          {others.map((m) => (
            <div key={m.id} className="border rounded-md p-4 space-y-2">
              <p>{m.text}</p>
              <div className="flex flex-wrap gap-1">
                {m.labels?.map((l) => (
                  <Badge key={l} variant="secondary">
                    {l}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    pinChatMessage(id, m.id)
                    refresh()
                  }}
                >
                  ปักหมุดข้อความ
                </Button>
                <Input
                  value={labelInput}
                  onChange={(e) => setLabelInput(e.target.value)}
                  placeholder="label"
                  className="h-8"
                />
                <Button variant="outline" size="sm" onClick={() => addLabel(m.id)}>
                  เพิ่ม label
                </Button>
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <p className="text-center py-8 text-gray-500">ไม่มีข้อความในห้องนี้</p>
          )}
        </div>
      </div>
    </div>
  )
}
