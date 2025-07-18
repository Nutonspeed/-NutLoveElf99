"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"

export interface ImageUploadProps {
  onFileChange: (file: File) => void
  previewUrl?: string
}

export default function ImageUpload({ onFileChange, previewUrl }: ImageUploadProps) {
  const [preview, setPreview] = useState(previewUrl)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    onFileChange(file)
  }

  return (
    <div className="space-y-2">
      <Input ref={fileRef} type="file" accept="image/*" onChange={handleChange} />
      {preview && (
        <div className="relative h-24 w-24">
          <Image src={preview} alt="preview" fill className="object-cover rounded-md" />
        </div>
      )}
    </div>
  )
}
