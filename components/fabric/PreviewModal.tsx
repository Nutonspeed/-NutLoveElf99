"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/modals/dialog"
import Image from "next/image"

export interface PreviewModalProps {
  fabric: {
    name: string
    images: string[]
  }
  open: boolean
  onOpenChange: (v: boolean) => void
}

export default function PreviewModal({ fabric, open, onOpenChange }: PreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{fabric.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {fabric.images.map((img) => (
            <div key={img} className="relative aspect-square">
              <Image src={img} alt={fabric.name} fill className="object-cover rounded" />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
