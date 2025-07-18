"use client"

import { useEffect, useState } from "react"
import { chatTemplates, loadChatTemplates } from "@/lib/mock-chat-templates"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/buttons/button"

export function SmartReply() {
  const [templates, setTemplates] = useState(chatTemplates)
  const [text, setText] = useState("")

  useEffect(() => {
    loadChatTemplates()
    setTemplates([...chatTemplates])
  }, [])

  const suggestions = templates.slice(0, 3)

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="พิมพ์สิ่งที่อยากตอบ"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="space-y-2">
        {suggestions.map((t) => (
          <div key={t.id} className="flex gap-2">
            <p className="flex-1 p-3 rounded border bg-gray-50 text-sm">
              {t.text}
            </p>
            <Button
              variant="outline"
              onClick={() => navigator.clipboard.writeText(t.text)}
            >
              คัดลอกข้อความ
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
