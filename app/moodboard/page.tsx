"use client"

import { useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Checkbox } from "@/components/ui/checkbox"
import { mockFabrics } from "@/lib/mock-fabrics"

export default function MoodboardPage() {
  const [selected, setSelected] = useState<string[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const [error, setError] = useState(false)

  const toggle = (slug: string) => {
    setSelected(prev => {
      if (prev.includes(slug)) return prev.filter(s => s !== slug)
      if (prev.length >= 5) return prev
      return [...prev, slug]
    })
  }

  const handlePreview = () => {
    if (selected.length < 3) {
      setError(true)
      setShowPreview(true)
    } else {
      setError(false)
      setShowPreview(true)
    }
  }

  const selectedFabrics = mockFabrics.filter(f => selected.includes(f.slug))

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">สร้าง Moodboard</h1>
        {!showPreview && (
          <>
            <p className="text-center">เลือกผ้าระหว่าง 3 ถึง 5 แบบ</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {mockFabrics.map(f => {
                const checked = selected.includes(f.slug)
                return (
                  <div key={f.slug} className="relative border rounded-lg overflow-hidden bg-white">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggle(f.slug)}
                      className="absolute top-2 left-2 z-10 bg-white/80"
                    />
                    <div className="relative aspect-square">
                      <Image src={f.images[0] || "/placeholder.svg"} alt={f.name} fill className="object-cover" />
                    </div>
                    <div className="p-2 text-center">
                      <p className="font-medium line-clamp-2">{f.name}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="text-center">
              <Button onClick={handlePreview} className="mt-4">สร้างตัวอย่าง Moodboard</Button>
            </div>
          </>
        )}
        {showPreview && (
          <>
            {error && selected.length < 3 && (
              <p className="text-destructive text-center">กรุณาเลือกลายผ้าอย่างน้อย 3 แบบ</p>
            )}
            {selected.length >= 3 && (
              <>
                <h2 className="text-2xl font-bold text-center">ตัวอย่าง Moodboard</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {selectedFabrics.map(f => (
                    <div key={f.slug} className="relative aspect-square rounded overflow-hidden">
                      <Image src={f.images[0] || "/placeholder.svg"} alt={f.name} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}
