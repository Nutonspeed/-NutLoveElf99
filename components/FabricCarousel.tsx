"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { mockFabrics } from "@/lib/mock-fabrics"

export function FabricCarousel() {
  const items = mockFabrics

  if (items.length === 0) {
    return (
      <p className="text-center text-gray-500">ไม่พบลายผ้าในหมวดนี้</p>
    )
  }

  return (
    <Carousel className="w-full" opts={{ align: "start" }}>
      <CarouselContent>
        {items.map((fabric) => (
          <CarouselItem
            key={fabric.id}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
          >
            <Link href={`/fabrics/${fabric.slug}`}>\
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={fabric.images[0]}
                  alt={fabric.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-center text-sm">{fabric.name}</p>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
