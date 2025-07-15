"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/buttons/button'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/modals/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface Props {
  images?: string[] | null
  name: string
}

export function FabricGallery({ images, name }: Props) {
  const [open, setOpen] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center w-full aspect-square border rounded-lg text-gray-500">
        ไม่พบภาพลายผ้า
      </div>
    )
  }

  return (
    <>
      <div className="relative w-full aspect-square">
        <Image src={images[0]} alt={name} fill className="object-cover rounded-lg" />
        <Button
          variant="outline"
          size="sm"
          className="absolute bottom-2 right-2"
          onClick={() => setOpen(true)}
        >
          ดูภาพเต็มจอ
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((img, idx) => (
                <CarouselItem key={idx} className="relative h-[80vh] w-full">
                  <Image src={img} alt={`${name} ${idx + 1}`} fill className="object-contain" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white border-white" />
            <CarouselNext className="text-white border-white" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  )
}
