"use client"

import { useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/buttons/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CopyToClipboardButton } from "@/components/CopyToClipboardButton"

const sofaTypes = [
  { value: "regular", label: "โซฟาทั่วไป" },
  { value: "lshape", label: "โซฟา L-Shape" },
  { value: "sectional", label: "โซฟาหลายชิ้น" },
  { value: "sofa-bed", label: "โซฟาเบด" },
]

export default function SofaGuidePage() {
  const [type, setType] = useState("")
  const [width, setWidth] = useState("")
  const [length, setLength] = useState("")
  const [height, setHeight] = useState("")
  const [result, setResult] = useState("")

  const calculate = () => {
    if (!type || !width || !length || !height) {
      setResult("กรุณากรอกข้อมูลให้ครบถ้วน")
      return
    }
    const w = parseFloat(width)
    let size = ""
    if (!Number.isNaN(w)) {
      if (w <= 140) size = "S"
      else if (w <= 185) size = "M"
      else if (w <= 230) size = "L"
      else size = "XL"
    }
    if (size) setResult(`แนะนำผ้าคลุมขนาด ${size}`)
    else setResult("ไม่พบขนาดที่เหมาะสม")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>คู่มือวัดขนาดโซฟา</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>ประเภทโซฟา</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกประเภทโซฟา" />
                </SelectTrigger>
                <SelectContent>
                  {sofaTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width">กว้าง (ซม.)</Label>
                <Input
                  id="width"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="length">ยาว (ซม.)</Label>
                <Input
                  id="length"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">สูง (ซม.)</Label>
                <Input
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  type="number"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=240&width=400&text=Sofa"
                alt="sofa"
                width={400}
                height={240}
                className="rounded"
              />
            </div>

            <Button className="w-full" onClick={calculate}>
              คำนวณ
            </Button>

            {result && (
              <div className="text-center space-y-2">
                <p className="font-medium">{result}</p>
                {result.startsWith("แนะนำ") && (
                  <CopyToClipboardButton text={result} />
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}

