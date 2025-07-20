"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/modals/dialog"
import { Button } from "@/components/ui/buttons/button"
import { suggestTags, loadTagHistory } from "@/lib/fabric-tag-utils"

interface Props {
  name: string
  color: string
  onApply: (tags: string[]) => void
}

export function TagSuggestionDialog({ name, color, onApply }: Props) {
  const [open, setOpen] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const history = loadTagHistory()

  useEffect(() => {
    if (open) setTags(suggestTags(name, color))
  }, [open, name, color])

  const apply = () => {
    onApply(tags)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">แนะนำแท็ก</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>แท็กที่แนะนำ</DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap gap-2 py-2">
          {tags.map((t) => (
            <span key={t} className="bg-gray-200 px-2 py-1 rounded text-sm">
              {t}
            </span>
          ))}
        </div>
        {history.length > 0 && (
          <div className="mt-2 text-sm text-gray-500">
            <p className="mb-1">แท็กที่ใช้บ่อย:</p>
            <div className="flex flex-wrap gap-2">
              {history.map((h) => (
                <span key={h} className="border px-2 py-1 rounded">
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={apply}>รับคำแนะนำทั้งหมด</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
