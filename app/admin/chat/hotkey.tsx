"use client"
import { useEffect, useState } from "react"
import CreateChatBillDialog from "@/components/admin/chat/CreateChatBillDialog"

export default function ChatHotkey() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "b") {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  if (!open) return null
  return <CreateChatBillDialog onCreated={() => setOpen(false)} />
}
