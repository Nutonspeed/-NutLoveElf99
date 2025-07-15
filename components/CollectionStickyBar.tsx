"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function CollectionStickyBar({ name }: { name: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 100)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`fixed left-0 right-0 z-40 bottom-0 md:top-0 md:bottom-auto border bg-background transition-transform ${visible ? "translate-y-0" : "translate-y-full md:-translate-y-full"}`}
    >
      <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
        <span className="font-medium truncate">{name}</span>
        <Link href="/" className="text-primary underline">
          กลับหน้าหลัก
        </Link>
      </div>
    </div>
  )
}
