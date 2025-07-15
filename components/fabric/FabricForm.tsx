"use client"

import { useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/label"
import ImageUpload from "./ImageUpload"

export interface FabricFormData {
  name: string
  collectionId: string
  imageUrl?: string
  imageFile?: File | null
}

export interface FabricFormProps {
  fabricData?: FabricFormData
  onSubmit: (data: FabricFormData) => void
}

export default function FabricForm({ fabricData, onSubmit }: FabricFormProps) {
  const [name, setName] = useState(fabricData?.name || "")
  const [collectionId, setCollectionId] = useState(fabricData?.collectionId || "")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState(fabricData?.imageUrl || "")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({ name, collectionId, imageUrl, imageFile })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ข้อมูลผ้า</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">ชื่อผ้า</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">รูปภาพ</Label>
            <ImageUpload
              onFileChange={(file) => setImageFile(file)}
              previewUrl={imageUrl}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="collection">รหัสคอลเลกชัน</Label>
            <Input id="collection" value={collectionId} onChange={(e) => setCollectionId(e.target.value)} />
          </div>
          <div className="pt-4 flex justify-end">
            <Button type="submit">บันทึก</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
