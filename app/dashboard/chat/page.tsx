"use client"
import { useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { useAuth } from "@/contexts/auth-context"
import { addInternalChatMessage, listInternalChatMessages } from "@/lib/mock-internal-chat"

export default function InternalChatPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState(listInternalChatMessages())
  const [text, setText] = useState("")

  const send = () => {
    if (!text) return
    addInternalChatMessage(user?.name || "anon", text)
    setText("")
    setMessages(listInternalChatMessages())
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Internal Chat</h1>
      <div className="mb-4 space-y-2 min-h-60 border p-2 rounded">
        {messages.map((m) => (
          <p key={m.id} className="text-sm"><strong>{m.sender}:</strong> {m.text}</p>
        ))}
        {messages.length === 0 && <p className="text-sm text-gray-500">No messages</p>}
      </div>
      <div className="flex gap-2">
        <input value={text} onChange={(e)=>setText(e.target.value)} className="flex-1 rounded border px-2 py-1" />
        <Button onClick={send}>Send</Button>
      </div>
    </div>
  )
}
