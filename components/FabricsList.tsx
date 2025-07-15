"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/buttons/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/modals/dialog"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/modals/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useCompare } from "@/contexts/compare-context"
import { useIsMobile } from "@/components/ui/use-mobile"
import { useToast } from "@/hooks/use-toast"
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
  const [selected, setSelected] = useState<Fabric | null>(null)
  const isMobile = useIsMobile()
  const { toast } = useToast()

  const handleCompare = () => {
    router.push(`/compare`)
  }

  const handleFavorite = (fabric: Fabric) => {
    const text = `#${fabric.sku || fabric.id} ${fabric.name}`
    navigator.clipboard.writeText(text)
  }

  const handleSend = () => {
    if (!selected) return
    const text = `ลูกค้าชอบลายนี้ค่ะ 👉 ${selected.sku || selected.id} ${selected.name}`
    navigator.clipboard.writeText(text)
    toast({ description: "พร้อมส่งให้แอดมินแล้ว!" })
    setSelected(null)
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
                <div className="relative aspect-square">
                  <Image
                    src={
                      fabric.image_urls?.[0] || fabric.image_url || "/placeholder.svg"
                    }
                    alt={fabric.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2 text-center">
                  <p className="font-medium line-clamp-2">{fabric.name}</p>
                </div>
              </Link>
              <div className="p-2 space-y-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => handleFavorite(fabric)}
                      >
                        ❤️ ถูกใจลายนี้
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>คัดลอกชื่อผ้าสำเร็จ</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => setSelected(fabric)}
                >
                  📤 ส่งให้แอดมิน
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  ลูกค้าสามารถคัดลอกข้อความแล้วส่งในแชทได้เลย
                </p>
              </div>
            </div>
          )
        })}
        {fabrics.length === 0 && (
          <div className="col-span-full text-center text-muted text-sm">
            ยังไม่มีลายผ้าในกลุ่มนี้
          </div>
        )}
      </div>
      {items.length > 1 && (
        <div className="mt-4 text-center">
          <Button onClick={handleCompare}>เปรียบเทียบตอนนี้</Button>
        </div>
      )}
      {selected && (
        isMobile ? (
          <Sheet open onOpenChange={() => setSelected(null)}>
            <SheetContent side="bottom" className="space-y-4">
              <SheetHeader>
                <SheetTitle>{selected.name}</SheetTitle>
              </SheetHeader>
              {selected.image_urls?.[0] || selected.image_url ? (
                <div className="relative w-full aspect-square">
                  <Image
                    src={selected.image_urls?.[0] || selected.image_url!}
                    alt={selected.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  ข้อมูลลายผ้าไม่สมบูรณ์
                </p>
              )}
              <SheetFooter>
                <Button className="w-full" onClick={handleSend}>
                  คัดลอกข้อความ
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ) : (
          <Dialog open onOpenChange={() => setSelected(null)}>
            <DialogContent className="space-y-4">
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
              </DialogHeader>
              {selected.image_urls?.[0] || selected.image_url ? (
                <div className="relative w-full aspect-square">
                  <Image
                    src={selected.image_urls?.[0] || selected.image_url!}
                    alt={selected.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  ข้อมูลลายผ้าไม่สมบูรณ์
                </p>
              )}
              <DialogFooter>
                <Button className="w-full" onClick={handleSend}>
                  คัดลอกข้อความ
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )
      )}
    </>
  )
}
