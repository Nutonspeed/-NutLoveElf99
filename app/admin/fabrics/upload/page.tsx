"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/label"
import { randomCollectionName } from "@/lib/speed-namer"

interface Item {
  id: string
  file: File
  url: string
  name: string
  error: boolean
}

export default function UploadFabricPage() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const names = items.map((i) => i.name)
      window.localStorage.setItem("uploaded-fabrics", JSON.stringify(names))
    } catch {}
  }, [items])

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newItems: Item[] = []
    Array.from(files).forEach((file) => {
      try {
        const url = URL.createObjectURL(file)
        newItems.push({
          id: `${file.name}-${Date.now()}`,
          file,
          url,
          name: randomCollectionName(),
          error: false,
        })
      } catch {
        newItems.push({
          id: `${file.name}-${Date.now()}`,
          file,
          url: "",
          name: randomCollectionName(),
          error: true,
        })
      }
    })
    setItems((prev) => [...prev, ...newItems])
  }

  const retry = (id: string) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it
        try {
          const url = URL.createObjectURL(it.file)
          return { ...it, url, error: false }
        } catch {
          return { ...it, error: true }
        }
      })
    )
  }

  const updateName = (id: string, name: string) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, name } : it)))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/fabrics">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">อัพโหลดผ้า (mock)</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>เพิ่มลายผ้า</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fabric-upload">เลือกรูปผ้า</Label>
                <Input id="fabric-upload" type="file" accept="image/*" multiple onChange={handleUpload} />
              </div>
              {items.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {items.map((item) => (
                    <div key={item.id} className="space-y-2">
                      {item.url && !item.error ? (
                        <img
                          src={item.url}
                          alt={item.name}
                          className="h-24 w-24 object-cover rounded-md"
                          onError={() => retry(item.id)}
                        />
                      ) : (
                        <div className="h-24 w-24 flex flex-col items-center justify-center rounded-md bg-gray-200 text-xs text-gray-500">
                          อัพโหลดล้มเหลว
                          <Button type="button" variant="ghost" size="sm" className="mt-1" onClick={() => retry(item.id)}>
                            <RotateCcw className="mr-1 h-3 w-3" />ลองอีกครั้ง
                          </Button>
                        </div>
                      )}
                      <Input value={item.name} onChange={(e) => updateName(item.id, e.target.value)} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

