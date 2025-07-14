"use client"
import { useState } from "react"
import { Button } from "@/components/ui/buttons/button"

export default function ChatwootFrame({ url }: { url: string }) {
  const [error, setError] = useState(false)
  const [key, setKey] = useState(0)

  if (error) {
    return (
      <div className="flex flex-col items-center space-y-2 text-center">
        <p className="text-red-600 text-sm">โหลดแชทไม่สำเร็จ</p>
        <Button
          variant="outline"
          onClick={() => {
            setKey((k) => k + 1)
            setError(false)
          }}
        >
          โหลดใหม่
        </Button>
      </div>
    )
  }

  return (
    <iframe
      key={key}
      src={url}
      className="w-full h-96 border rounded"
      onError={() => setError(true)}
      allow="clipboard-write"
    />
  )
}
