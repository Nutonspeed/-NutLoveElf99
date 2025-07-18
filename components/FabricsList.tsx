"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import QRCode from "react-qr-code"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/buttons/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { Dialog, DialogContent } from "@/components/ui/modals/dialog"
import { useCompare } from "@/contexts/compare-context"
import { mockCoViewLog } from "@/lib/mock-co-view-log"

interface Fabric {
  id: string
  slug: string | null
  name: string
  sku?: string | null
  image_url?: string | null
  image_urls?: string[] | null
}

export function FabricsList({ fabrics }: { fabrics: Fabric[] }) {
  const { items, toggleCompare } = useCompare()
  const router = useRouter()
  const [qrSlug, setQrSlug] = useState<string | null>(null)

  const handleCompare = () => {
    router.push(`/compare`)
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {fabrics.map((fabric) => {
          const slug = fabric.slug || fabric.id
          const checked = items.includes(slug)
          const coViewed = mockCoViewLog[slug]?.length
          return (
            <div
              key={slug}
              className="border rounded-lg overflow-hidden bg-white hover:shadow transition relative"
            >
              {coViewed && (
                <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                  ดูด้วยกันบ่อย
                </span>
              )}
              <Checkbox
                checked={checked}
                onCheckedChange={() => toggleCompare(slug)}
                className="absolute top-2 left-2 z-10 bg-white/80"
              />
              <Link href={`/fabrics/${slug}`}>
                <Carousel className="relative aspect-square">
                  <CarouselContent>
                    {(fabric.image_urls?.length ? fabric.image_urls : [fabric.image_url]).map(
                      (img, idx) => (
                        <CarouselItem key={idx} className="relative aspect-square">
                          <Image
                            src={img || '/placeholder.svg'}
                            alt={fabric.name}
                            fill
                            className="object-cover"
                          />
                        </CarouselItem>
                      )
                    )}
                  </CarouselContent>
                  {fabric.image_urls && fabric.image_urls.length > 1 && (
                    <>
                      <CarouselPrevious />
                      <CarouselNext />
                    </>
                  )}
                </Carousel>
                <div className="p-2 text-center">
                  <p className="font-medium line-clamp-2">{fabric.name}</p>
                </div>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQrSlug(slug)}
                className="absolute bottom-2 right-2"
              >
                QR Preview
              </Button>
            </div>
          )
        })}
      </div>
      {items.length > 1 && (
        <div className="mt-4 text-center">
          <Button onClick={handleCompare}>เปรียบเทียบตอนนี้</Button>
        </div>
      )}
      <Dialog open={qrSlug !== null} onOpenChange={() => setQrSlug(null)}>
        <DialogContent className="flex flex-col items-center">
          {qrSlug && (
            <QRCode value={`https://elfcover.vercel.app/fabrics/${qrSlug}`} />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
