"use client"

import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface RedirectLinkCardProps {
  slug: string
  url: string
}

export function RedirectLinkCard({ slug, url }: RedirectLinkCardProps) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="font-medium">/{slug}</p>
          <p className="text-sm text-gray-500 break-all">{url}</p>
        </div>
        <Link href={url} className="text-primary underline" target="_blank">
          ไปยังลิงก์
        </Link>
      </CardContent>
    </Card>
  )
}
