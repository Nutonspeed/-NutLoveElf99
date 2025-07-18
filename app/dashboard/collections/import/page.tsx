"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import JSZip from "jszip"
import Image from "next/image"
import { collections, addCollection } from "@/mock/collections"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/inputs/input"

interface ImportItem {
  name: string
  images: string[]
}

export default function ImportCollectionsPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [items, setItems] = useState<ImportItem[] | null>(null)

  const handleParse = async () => {
    if (!file) return
    if (!file.name.endsWith(".zip")) {
      setError("ไฟล์ต้องเป็น .zip")
      return
    }
    try {
      const zip = await JSZip.loadAsync(await file.arrayBuffer())
      const entries = Object.keys(zip.files).filter((n) => /\.(jpg|png|webp)$/i.test(n))
      if (entries.length === 0) {
        setError("ไม่พบไฟล์ภาพใน zip")
        return
      }
      const groups: Record<string, string[]> = {}
      for (const name of entries) {
        const folder = name.includes("/") ? name.split("/")[0] : ""
        if (!groups[folder]) groups[folder] = []
        groups[folder].push(`/mock/${name}`)
      }
      const arr = Object.entries(groups).map(([folder, imgs], idx) => ({
        name: folder || `collection_${String(idx + 1).padStart(3, "0")}`,
        images: imgs,
      }))
      setItems(arr)
    } catch (e) {
      setError("เกิดข้อผิดพลาดในการอ่านไฟล์")
    }
  }

  const handleSave = () => {
    if (!items) return
    items.forEach((it, idx) => {
      const name = it.name.trim() || `collection_${String(collections.length + idx + 1).padStart(3, "0")}`
      addCollection({ name })
    })
    router.push("/dashboard/collections")
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">นำเข้าคอลเลกชันจาก ZIP</h1>
      <input
        type="file"
        accept=".zip"
        onChange={(e) => {
          setError("")
          setItems(null)
          setFile(e.target.files?.[0] || null)
        }}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {items ? (
        <div className="space-y-4">
          {items.map((it, idx) => (
            <div key={idx} className="space-y-2 border p-4 rounded">
              <Input
                value={it.name}
                onChange={(e) => {
                  const arr = items.slice()
                  arr[idx].name = e.target.value
                  setItems(arr)
                }}
              />
              <div className="flex gap-2 overflow-x-auto">
                {it.images.map((src, i) => (
                  <div key={i} className="relative w-24 h-24 shrink-0">
                    <Image src={src} alt={it.name} fill className="object-cover rounded" />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Button onClick={handleSave}>บันทึก</Button>
        </div>
      ) : (
        <Button onClick={handleParse} disabled={!file}>นำเข้า</Button>
      )}
    </div>
  )
}
