"use client"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/buttons/button"
import { defaultTags } from "@/lib/mock-customer-tags"

interface TagSelectorProps {
  onSelect: (tag: string) => void
}

export default function TagSelector({ onSelect }: TagSelectorProps) {
  const [custom, setCustom] = useState("")
  return (
    <div className="flex space-x-2">
      <Select onValueChange={onSelect}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="เลือกแท็ก" />
        </SelectTrigger>
        <SelectContent>
          {defaultTags.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input
        value={custom}
        onChange={(e) => setCustom(e.target.value)}
        className="border px-2 py-1 rounded flex-1"
        placeholder="เพิ่มแท็กใหม่"
      />
      <Button
        variant="outline"
        onClick={() => {
          if (custom) {
            onSelect(custom)
            setCustom("")
          }
        }}
      >
        เพิ่ม
      </Button>
    </div>
  )
}
