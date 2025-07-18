"use client"
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/modals/dialog'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import { suggestFabricTags, suggestFabricCategory } from '@/lib/fabric-tags'

export default function TagSuggestDialog({
  name,
  color,
  onApply,
}: {
  name: string
  color: string
  onApply: (tags: string[], category: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [tags, setTags] = useState<string[]>([])
  const [category, setCategory] = useState('')

  useEffect(() => {
    if (open) {
      const suggested = suggestFabricTags(name, color)
      setTags(suggested)
      setCategory(suggestFabricCategory(name))
      setStep(1)
    }
  }, [open, name, color])

  const applyAll = () => {
    onApply(tags, category)
    setOpen(false)
  }

  const applyCustom = () => {
    onApply(tags, category)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">แนะนำ tag</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>แนะนำแท็กและหมวดหมู่</DialogTitle>
        </DialogHeader>
        {step === 1 && (
          <div className="space-y-4">
            <p>แท็กที่แนะนำ: {tags.join(', ') || 'ไม่มี'}</p>
            <p>หมวดหมู่ที่แนะนำ: {category || 'ไม่มี'}</p>
            <div className="flex justify-end space-x-2">
              <Button onClick={applyAll}>รับคำแนะนำทั้งหมด</Button>
              <Button variant="outline" onClick={() => setStep(2)}>
                ปรับแก้เอง
              </Button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="tags" className="font-medium">
                แท็ก (คั่นด้วย comma)
              </label>
              <Input
                id="tags"
                value={tags.join(',')}
                onChange={(e) =>
                  setTags(
                    e.target.value
                      .split(',')
                      .map((t) => t.trim())
                      .filter(Boolean)
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="font-medium">
                หมวดหมู่
              </label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={applyCustom}>บันทึก</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
