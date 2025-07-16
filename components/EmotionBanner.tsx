"use client"
import { useState } from "react"
import { mockEmotionMessages } from "@/mock/emotionMessages"

export default function EmotionBanner() {
  const [message] = useState(
    () =>
      mockEmotionMessages[
        Math.floor(Math.random() * mockEmotionMessages.length)
      ],
  )
  return (
    <div className="bg-pink-50 text-pink-800 text-center p-2 rounded-md">
      {message}
    </div>
  )
}
