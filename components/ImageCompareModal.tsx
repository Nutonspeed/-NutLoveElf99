"use client"

import Image from 'next/image'
import { useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/modals/dialog'
import { Button } from '@/components/ui/buttons/button'

interface Props {
  oldUrl: string
  newUrl: string
}

export function ImageCompareModal({ oldUrl, newUrl }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">เปรียบเทียบกับภาพเดิม</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>เปรียบเทียบภาพ</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-square">
            <Image src={oldUrl} alt="old" fill className="object-cover rounded-md" />
          </div>
          <div className="relative aspect-square">
            <Image src={newUrl} alt="new" fill className="object-cover rounded-md" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
