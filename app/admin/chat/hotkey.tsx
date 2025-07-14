"use client"
import { useEffect, useState } from "react"
import CreateChatBillDialog from "@/components/admin/chat/CreateChatBillDialog"
import { toast } from "sonner"

export default function ChatHotkey() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "b") {
        e.preventDefault()
        try {
          setOpen(true)
        } catch (err) {
          toast.error("เปิดหน้าสร้างบิลไม่สำเร็จ")
        }
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  if (!open) return null
  return <CreateChatBillDialog onCreated={() => setOpen(false)} />
}
