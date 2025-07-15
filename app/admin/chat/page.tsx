"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/modals/dialog"
import { toast } from "sonner"
import { mockBills } from "@/mock/bills"
import {
  mockConversations,
  addConversationMessage,
  type Conversation,
} from "@/mock/conversations"

export default function AdminChatPage() {
  const chatwootUrl =
    process.env.NEXT_PUBLIC_CHATWOOT_URL || "http://localhost:3000/admin"
  const [loadError, setLoadError] = useState(false)
  const [loading, setLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const [conversations, setConversations] = useState<Conversation[]>([...mockConversations])
  const [activeId, setActiveId] = useState(conversations[0]?.id)
  const activeConv = conversations.find((c) => c.id === activeId)
  const [openSend, setOpenSend] = useState(false)
  const [selectedBill, setSelectedBill] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.src = chatwootUrl
    }
    setLoadError(false)
    setLoading(true)
  }

  const handleSendBill = () => {
    if (!selectedBill || !activeConv) return
    setSending(true)
    setTimeout(() => {
      addConversationMessage(activeConv.id, {
        sender: "admin",
        text: `แนบบิล ${selectedBill}`,
        billId: selectedBill,
      })
      setConversations([...mockConversations])
      toast.success("แนบบิลในแชท (mock)")
      setOpenSend(false)
      setSending(false)
    }, 800)
  }

  if (!loadError) {
    return (
      <div className="h-full">
        {loading && (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={chatwootUrl}
          className="w-full h-full border-none"
          onLoad={() => setLoading(false)}
          onError={() => setLoadError(true)}
        />
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="space-y-2 border rounded p-2 overflow-y-auto max-h-[70vh]">
        {conversations.map((c) => (
          <button
            key={c.id}
            className={`block w-full text-left p-2 rounded ${c.id === activeId ? "bg-primary text-white" : "hover:bg-gray-100"}`}
            onClick={() => setActiveId(c.id)}
          >
            <div className="font-semibold">{c.customer}</div>
            <div className="text-sm truncate">{c.messages[c.messages.length - 1]?.text}</div>
          </button>
        ))}
      </div>
      <div className="md:col-span-2 border rounded flex flex-col h-[70vh]">
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {activeConv?.messages.map((m) => (
            <div key={m.id} className="space-y-1">
              <div className={`p-2 rounded inline-block ${m.sender === "admin" ? "bg-blue-100" : "bg-gray-100"}`}>{m.text}</div>
              {m.billId && <div className="text-xs text-gray-500 ml-2">พรีวิวบิล {m.billId}</div>}
            </div>
          ))}
        </div>
        <div className="border-t p-2 flex justify-end space-x-2">
          <Button onClick={() => setOpenSend(true)} disabled={!mockBills.length}>
            ส่งบิลในแชทนี้
          </Button>
          <Button variant="secondary" onClick={handleReload}>เปิดด้วย Chatwoot</Button>
        </div>
      </div>
      <Dialog open={openSend} onOpenChange={setOpenSend}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>เลือกบิลที่จะส่ง</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {mockBills.map((b) => (
              <button
                key={b.id}
                className={`w-full text-left p-2 rounded border ${b.id === selectedBill ? "bg-primary text-white" : ""}`}
                onClick={() => setSelectedBill(b.id)}
              >
                {b.id} - {b.customer}
              </button>
            ))}
            {!mockBills.length && (
              <div className="text-center text-sm text-gray-500">ยังไม่มีบิล</div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleSendBill} disabled={!selectedBill || sending}>
              {sending ? "กำลังส่ง..." : "แนบบิลในแชท"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
