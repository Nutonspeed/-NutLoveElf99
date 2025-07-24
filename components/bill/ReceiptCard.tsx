"use client"
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/cards/card'
import { Button } from '@/components/ui/buttons/button'

interface Props {
  url: string
  note?: string
}

export default function ReceiptCard({ url, note }: Props) {
  if (!url) return null
  return (
    <Card>
      <CardHeader>
        <CardTitle>ใบเสร็จ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Button variant="outline">📄 ดูใบเสร็จ</Button>
        </a>
        {note && <p className="text-sm">{note}</p>}
      </CardContent>
    </Card>
  )
}
