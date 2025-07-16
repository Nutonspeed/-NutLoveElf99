"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/buttons/button"
import EmptyState from "@/components/EmptyState"
import { isDevMock } from "@/lib/mock-settings"

export default function DevJsonValidator() {
  const [text, setText] = useState("")
  const [error, setError] = useState<string | null>(null)

  if (!isDevMock) {
    return <EmptyState title="ไม่อนุญาต" />
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setText(val)
    try {
      JSON.parse(val)
      setError(null)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const formatJson = () => {
    try {
      const obj = JSON.parse(text)
      setText(JSON.stringify(obj, null, 2))
      setError(null)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        value={text}
        onChange={handleChange}
        placeholder="วาง JSON"
        className={error ? "border-destructive" : ""}
        rows={10}
      />
      {error && <p className="text-destructive text-sm">JSON นี้ไม่ถูกต้อง</p>}
      <Button onClick={formatJson}>จัดรูปแบบให้สวย</Button>
    </div>
  )
}
