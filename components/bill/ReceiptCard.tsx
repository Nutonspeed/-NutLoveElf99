"use client"
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/cards/card'
import { Button } from '@/components/ui/buttons/button'
import { isPdf, isImage } from '@/lib/utils/validateFileType'

interface Props {
  url: string
  note?: string
}

export default function ReceiptCard({ url, note }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ใบเสร็จ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {url ? (
          isPdf(url) ? (
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">📄 ดูใบเสร็จ</Button>
            </a>
          ) : (
            isImage(url) && <img src={url} alt="receipt" className="w-full" />
          )
        ) : (
          <p className="text-sm text-gray-500">ยังไม่มีใบเสร็จแนบ</p>
        )}
        {note && <p className="text-sm text-gray-500">{note}</p>}
      </CardContent>
    </Card>
  )
}
