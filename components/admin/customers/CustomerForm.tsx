"use client"
import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export interface CustomerFormData {
  name: string
  phone: string
  tags: string[]
  note: string
}

export default function CustomerForm({
  onSubmit,
  loading = false,
}: {
  onSubmit: (data: CustomerFormData) => void
  loading?: boolean
}) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [note, setNote] = useState("")
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !tags.includes(t)) {
      setTags([...tags, t])
    }
    setTagInput("")
  }

  const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag))

  const disabled = !name.trim() || !phone.trim() || loading

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (disabled) return
    onSubmit({ name: name.trim(), phone: phone.trim(), tags, note })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        ref={nameRef}
        placeholder="ชื่อลูกค้า"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Input
        placeholder="เบอร์โทร"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <div className="space-y-2">
        <div className="flex space-x-2">
          <Input
            placeholder="เพิ่มแท็ก"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault()
                addTag()
              }
            }}
          />
          <Button type="button" onClick={addTag} disabled={!tagInput.trim()}>
            เพิ่ม
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map(tag => (
              <Badge
                key={tag}
                className="cursor-pointer"
                onClick={() => removeTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <Textarea
        placeholder="หมายเหตุ"
        value={note}
        onChange={e => setNote(e.target.value)}
      />
      <Button type="submit" disabled={disabled} className="w-full">
        บันทึก
      </Button>
    </form>
  )
}
