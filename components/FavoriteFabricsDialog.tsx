"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/modals/dialog"
import { Button } from "@/components/ui/buttons/button"
import { useFavorites } from "@/contexts/favorites-context"
import { mockFabrics } from "@/lib/mock-fabrics"
import { toast } from "sonner"

export function FavoriteFabricsDialog() {
  const { favorites, toggleFavorite } = useFavorites()
  const items = mockFabrics.filter(f => favorites.includes(f.slug))

  const handleCopy = (slug: string) => {
    const url = `${window.location.origin}/fabrics/${slug}`
    navigator.clipboard.writeText(url)
      .then(() => toast.success("คัดลอกลิงก์สำเร็จ"))
      .catch(() => toast.error("ไม่สามารถคัดลอกลิงก์ได้"))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">ลายที่ชอบ</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>ลายผ้าที่ชอบ</DialogTitle>
        </DialogHeader>
        {items.length === 0 ? (
          <p className="text-center text-sm text-gray-600">ยังไม่มีลายผ้าที่ชอบ</p>
        ) : (
          <div className="space-y-4">
            {items.map(f => (
              <div key={f.id} className="flex items-center gap-4">
                <Image src={f.images[0] || '/placeholder.svg'} alt={f.name} width={80} height={80} className="rounded" />
                <div className="flex-1">
                  <p className="font-medium">{f.name}</p>
                  <p className="text-sm text-gray-500">รหัส: {f.sku}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" onClick={() => toggleFavorite(f.slug)}>
                    ลบออกจากรายการนี้
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => handleCopy(f.slug)}>
                    คัดลอกลิงก์ลายนี้
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
