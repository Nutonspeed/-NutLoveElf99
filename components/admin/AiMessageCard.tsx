"use client"

import { Card, CardContent } from "@/components/ui/cards/card"
import { getDailyAiMessage } from "@/lib/ai-messages"

export default function AiMessageCard() {
  const message = getDailyAiMessage()

  return (
    <Card className="my-4 bg-yellow-50">
      <CardContent className="p-4 flex items-start space-x-2">
        <span className="text-2xl">🤖</span>
        <p className="text-sm">{message}</p>
      </CardContent>
    </Card>
  )
}
