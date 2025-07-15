"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/modals/dialog"
import { Button } from "@/components/ui/buttons/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Props {
  images: string[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FabricGalleryModal({ images, open, onOpenChange }: Props) {
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(false)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
      else if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length)
      else if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, images.length, onOpenChange])

  useEffect(() => {
    if (open) {
      setIndex(0)
      setZoom(false)
    }
  }, [open])

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  const toggleZoom = () => setZoom((z) => !z)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-none w-screen h-screen bg-black">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={images[index]}
            alt="fabric"
            fill
            sizes="100vw"
            className={`object-contain transition-transform ${zoom ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"}`}
            onClick={toggleZoom}
          />
          {images.length > 1 && (
            <>
              <Button
                size="icon"
                variant="secondary"
                className="absolute left-4 top-1/2 -translate-y-1/2"
                onClick={prev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={next}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
          <Button size="sm" className="absolute top-4 left-4" onClick={() => onOpenChange(false)}>
            ปิด
          </Button>
          <Button size="sm" className="absolute top-4 right-4" onClick={toggleZoom}>
            ขยาย
          </Button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">เลื่อนดู</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
