"use client"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { isDevMock } from "@/lib/mock-settings"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Button } from "@/components/ui/buttons/button"
import { fastBills } from "@/lib/mock-fast-bills"
import { chatBills, loadChatBills } from "@/lib/mock-chat-bills"
import { mockCollections } from "@/lib/mock-collections"

const sets = {
  "fast-bills": () => fastBills,
  "chat-bills": () => {
    loadChatBills()
    return chatBills
  },
  collections: () => mockCollections,
}

export default function RenderSandboxPage() {
  const { user, isAuthenticated } = useAuth()
  const [selected, setSelected] = useState<keyof typeof sets | "">("")
  const [preview, setPreview] = useState<any | null>(null)

  useEffect(() => {
    if (selected) {
      const data = sets[selected]()
      setPreview(data[0] || null)
    } else {
      setPreview(null)
    }
  }, [selected])

  if (!isDevMock) return null
  if (!isAuthenticated || user?.role !== "admin") return null

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label className="text-sm">เลือกชุด mock</label>
        <select
          className="border rounded p-2"
          value={selected}
          onChange={(e) => setSelected(e.target.value as keyof typeof sets)}
        >
          <option value="">-</option>
          <option value="fast-bills">fast-bills</option>
          <option value="chat-bills">chat-bills</option>
          <option value="collections">collections</option>
        </select>
        <Button variant="outline" onClick={() => setSelected("")}>รีเซ็ต</Button>
      </div>
      {preview && (
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap break-all text-sm bg-gray-100 p-4 rounded">
              {JSON.stringify(preview, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
