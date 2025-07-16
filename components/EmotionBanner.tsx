"use client"
import { useState, useEffect } from "react"

const mockEmotion = "สดใส"

export default function EmotionBanner() {
  const [emotion] = useState(mockEmotion)
  const [animate, setAnimate] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setAnimate(false), 1000)
    return () => clearTimeout(t)
  }, [])
  return (
    <div
      className={
        "bg-pink-50 text-pink-800 text-center p-2 rounded-md" +
        (animate ? " animate-bounce" : "")
      }
    >
      วันนี้คุณรู้สึก {emotion}
    </div>
  )
}
