"use client"
import { useState } from "react"

const mockEmotion = "สดใส"

export default function EmotionBanner() {
  const [emotion] = useState(mockEmotion)
  return (
    <div className="bg-pink-50 text-pink-800 text-center p-2 rounded-md">
      วันนี้คุณรู้สึก {emotion}
    </div>
  )
}
