'use client'

import Image from 'next/image'
import { useState } from 'react'
import QRCode from 'react-qr-code'
import { Button } from '@/components/ui/buttons/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { Dialog, DialogContent } from '@/components/ui/modals/dialog'

interface Props {
  images: string[]
  slug: string
}

export function FabricImages({ images: initialImages, slug }: Props) {
  const [images, setImages] = useState(initialImages)
  const [preview, setPreview] = useState<string | null>(null)
  const [qrOpen, setQrOpen] = useState(false)

  const setPrimary = (idx: number) => {
    if (idx === 0) return
    const next = [...images]
    const [img] = next.splice(idx, 1)
    next.unshift(img)
    setImages(next)
  }

  return (
    <>
      <Carousel className="relative w-full">
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={i}>
              <div className="relative aspect-square">
                <Image
                  src={src || '/placeholder.svg'}
                  alt={`image-${i}`}
                  fill
                  className="object-cover rounded-lg cursor-pointer"
                  onClick={() => setPreview(src)}
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setPrimary(i)
                  }}
                  className="absolute bottom-2 right-2"
                >
                  Set as Primary Image
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
      <div className="mt-2 flex space-x-2">
        <Button variant="outline" size="sm" onClick={() => setQrOpen(true)}>
          QR Preview
        </Button>
      </div>

      <Dialog open={preview !== null} onOpenChange={() => setPreview(null)}>
        <DialogContent className="max-w-sm">
          {preview && (
            <img src={preview} alt="preview" className="w-full h-auto rounded" />
          )}
          <p className="text-center text-sm text-gray-500">zoom/swipe mock</p>
        </DialogContent>
      </Dialog>

      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="flex flex-col items-center">
          <QRCode value={`https://elfcover.vercel.app/fabrics/${slug}`} />
        </DialogContent>
      </Dialog>
    </>
  )
}
