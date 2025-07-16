"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"

export default function DevTestPage() {
  const [path, setPath] = useState("")
  const router = useRouter()

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!path.trim()) return
    const p = path.startsWith("/") ? path.trim() : `/${path.trim()}`
    router.push(`${p}?forceError=true`)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto py-16 max-w-md">
        <form onSubmit={handleSend} className="space-y-4">
          <Input
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="/example"
          />
          <Button type="submit">ส่ง param ไปยัง route ทดสอบ</Button>
        </form>
      </div>
      <Footer />
    </div>
  )
}
