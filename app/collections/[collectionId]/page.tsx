"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { toast } from "sonner"
import data from "@/mock/collections.json"
import { CopyPageLinkButton } from "@/components/CopyPageLinkButton"
import { Badge } from "@/components/ui/badge"

interface ImageItem {
  url: string
  code: string
  tag?: string
}

interface Collection {
  id: string
  title: string
  images: ImageItem[]
}

export default function CollectionPage({ params }: { params: { collectionId: string } }) {
  const collection = (data as Collection[]).find(c => c.id === params.collectionId)

  if (!collection) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-1 text-destructive">
          ไม่พบคอลเลกชันนี้
        </div>
        <Footer />
      </div>
    )
  }

  const handleSelect = (code: string) => {
    toast.success(`เลือกลาย ${code} แล้ว ส่งหาทางร้านสำเร็จ`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{collection.title}</h1>
          <CopyPageLinkButton />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {collection.images.map(img => (
            <button
              key={img.code}
              onClick={() => handleSelect(img.code)}
              className="relative border rounded overflow-hidden"
            >
              <Image
                src={img.url}
                alt={img.code}
                width={300}
                height={300}
                className="object-cover w-full aspect-square"
              />
              {img.tag && (
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                  {img.tag === "hot" ? "สินค้าขายดี" : "แนะนำ"}
                </Badge>
              )}
              <span className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1 rounded">
                {img.code}
              </span>
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
