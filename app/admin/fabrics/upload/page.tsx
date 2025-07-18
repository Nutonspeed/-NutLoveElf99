"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { prepareFabricImageWebP } from "@/lib/image-handler"

interface UploadItem {
  filename: string
  slug: string
  sku: string
  size: number
  url: string
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export default function FabricUploadPage() {
  const { toast } = useToast()
  const [uploads, setUploads] = useLocalStorage<UploadItem[]>(
    "fabric-uploads",
    [],
  )
  const [processing, setProcessing] = useState(false)
  const [copied, setCopied] = useState<{ slug?: string; sku?: string }>({})

  const getNextIndex = () => {
    const max = uploads.reduce((m, u) => {
      const num = parseInt(u.filename.match(/fabric-(\d+)/)?.[1] || "0", 10)
      return Math.max(m, num)
    }, 0)
    return max + 1
  }

  const handleFiles = async (files: FileList | null) => {
    if (!files) return
    setProcessing(true)
    const newItems: UploadItem[] = []
    let index = getNextIndex()
    for (const file of Array.from(files)) {
      const processed = await prepareFabricImageWebP(file, index)
      const slug = slugify(file.name.split(".")[0])
      const sku = `FBC-${String(index).padStart(3, "0")}`
      const url = URL.createObjectURL(processed)
      newItems.push({
        filename: processed.name,
        slug,
        sku,
        size: Math.round(processed.size / 1024),
        url,
      })
      index += 1
    }
    setUploads([...uploads, ...newItems])
    setProcessing(false)
  }

  const copy = (text: string, type: "slug" | "sku") => {
    navigator.clipboard.writeText(text)
    setCopied({ [type]: text })
    toast({ title: "คัดลอกแล้ว" })
    setTimeout(() => setCopied({}), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/fabrics">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">อัปโหลดผ้า</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>อัปโหลดไฟล์</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFiles(e.target.files)}
              disabled={processing}
            />
            {processing && <p>กำลังประมวลผล...</p>}
          </CardContent>
        </Card>
        {uploads.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>รายการไฟล์ ({uploads.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {uploads.map((u) => (
                  <div key={u.filename} className="flex items-center space-x-4">
                    <img
                      src={u.url}
                      alt={u.filename}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <div className="flex-1 space-y-1">
                      <p className="font-mono text-sm">{u.filename}</p>
                      <p className="text-sm text-gray-600">
                        {u.size} KB • {u.slug} • {u.sku}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copy(u.slug, "slug")}
                      >
                        {copied.slug === u.slug ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copy(u.sku, "sku")}
                      >
                        {copied.sku === u.sku ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
