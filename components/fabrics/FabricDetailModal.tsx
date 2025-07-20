"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/modals/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/buttons/button"

export interface FabricDetail {
  id?: string
  name: string
  code: string
  imageUrl: string
  status: "active" | "archived"
}

interface FabricDetailModalProps {
  fabric: FabricDetail | null
  open: boolean
  onOpenChange?: (open: boolean) => void
}

export default function FabricDetailModal({ fabric, open, onOpenChange }: FabricDetailModalProps) {
  if (!fabric) return null

  const badgeStyle =
    fabric.status === "active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-700"

  const handleCopy = () => {
    navigator.clipboard.writeText(fabric.code).catch((err) => {
      console.error("Failed to copy", err)
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{fabric.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-md border" style={{ paddingBottom: "100%" }}>
            <Image src={fabric.imageUrl} alt={fabric.name} fill className="object-cover" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{fabric.code}</p>
            </div>
            <Badge className={badgeStyle}>{fabric.status === "active" ? "Active" : "Archived"}</Badge>
          </div>
          <Button onClick={handleCopy}>Copy Code to Clipboard</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

