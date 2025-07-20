"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, Sparkles } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/inputs/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { getMedia, type MediaItem } from "@/lib/mock-media"

interface NameItem {
  id: string
  original: string
  name: string
}

export default function SmartToolsPage() {
  const { user, isAuthenticated } = useAuth()
  const initial = getMedia().slice(0, 4).map((m, idx) => ({
    id: m.id,
    original: `image_${idx + 1}.jpg`,
    name: "",
  }))
  const [items, setItems] = useState<NameItem[]>(initial)
  const [history, setHistory] = useState<string[][]>([])
  const [template, setTemplate] = useState("{prefix}-{color}-{index}")
  const [prefix, setPrefix] = useState("img")
  const [color, setColor] = useState("red")

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">กรุณาเข้าสู่ระบบ</h1>
          <Link href="/login">
            <Button>เข้าสู่ระบบ</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่มีสิทธิ์เข้าถึง</h1>
          <Link href="/">
            <Button>กลับหน้าแรก</Button>
          </Link>
        </div>
      </div>
    )
  }

  const applyTemplate = () => {
    const renamed = items.map((it, idx) => ({
      ...it,
      name: template
        .replace("{prefix}", prefix)
        .replace("{color}", color)
        .replace("{index}", String(idx + 1)),
    }))
    setItems(renamed)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(items.map((i) => i.name).join("\n"))
    toast({ title: "คัดลอกชื่อภาพทั้งหมดแล้ว" })
  }

  const handleSave = () => {
    setHistory([items.map((i) => i.name), ...history].slice(0, 5))
    toast({ title: "ชื่อภาพถูกตั้งสำเร็จแล้ว" })
  }

  const duplicate = (name: string) => items.filter((i) => i.name === name).length > 1

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Smart Tools</h1>
        </div>
        <Tabs defaultValue="name" className="w-full">
          <TabsList>
            <TabsTrigger value="name">ตั้งชื่อ</TabsTrigger>
            <TabsTrigger value="group">กลุ่ม</TabsTrigger>
            <TabsTrigger value="resize">Resize</TabsTrigger>
          </TabsList>
          <TabsContent value="name">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>ตั้งชื่อรูปภาพ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input value={prefix} onChange={(e) => setPrefix(e.target.value)} placeholder="prefix" />
                  <Input value={color} onChange={(e) => setColor(e.target.value)} placeholder="color" />
                  <Input value={template} onChange={(e) => setTemplate(e.target.value)} className="md:col-span-3" />
                </div>
                <Button onClick={applyTemplate} variant="outline">
                  <Sparkles className="mr-2 h-4 w-4" />สุ่มชื่อ (mock)
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((it) => (
                    <div key={it.id} className="border rounded p-2 flex items-center space-x-2">
                      <span className="text-sm w-1/2 truncate">{it.original}</span>
                      <Input
                        value={it.name}
                        onChange={(e) =>
                          setItems((prev) =>
                            prev.map((p) => (p.id === it.id ? { ...p, name: e.target.value } : p)),
                          )
                        }
                        className="w-full"
                      />
                      {duplicate(it.name) && it.name && (
                        <span className="text-red-500 text-xs">ซ้ำ</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSave}>บันทึก</Button>
                  <Button variant="outline" onClick={handleCopy}>
                    <Copy className="mr-2 h-4 w-4" />คัดลอกชื่อภาพทั้งหมด
                  </Button>
                </div>
              </CardContent>
            </Card>
            {history.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>ประวัติล่าสุด</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {history.map((h, idx) => (
                    <Textarea key={idx} value={h.join("\n")} readOnly />
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="group">
            <p className="mt-4 text-muted-foreground">mock group tools</p>
          </TabsContent>
          <TabsContent value="resize">
            <p className="mt-4 text-muted-foreground">mock resize tools</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
