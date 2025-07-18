"use client"
import { useState } from "react"
import { getEmotionForDay } from "@/lib/mock-emotions"

export default function EmotionBanner() {
  const [index, setIndex] = useState(new Date().getDay())
  const emotion = getEmotionForDay(index)

  return (
    <div className="mb-4 flex w-full items-center rounded-lg bg-gradient-to-r from-pink-100 via-yellow-50 to-yellow-100 p-3 text-sm">
      <span className="mr-2 text-xl">{emotion.emoji}</span>
      <span className="flex-1">{emotion.text}</span>
      <button className="text-xs underline" onClick={() => setIndex((index + 1) % 7)}>
        เปลี่ยนข้อความกำลังใจ
      </button>
    </div>
  )
}
