"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Button } from '@/components/ui/buttons/button'
import { copyToClipboard } from '@/helpers/clipboard'
import { formatDateThai } from '@/lib/utils/formatDateThai'

interface Props {
  trackingNumber?: string
  carrier?: string
  shippedAt?: string
}

export default function ShippingInfoCard({ trackingNumber, carrier, shippedAt }: Props) {
  if (!trackingNumber && !carrier && !shippedAt) return null
  return (
    <Card>
      <CardHeader>
        <CardTitle>ข้อมูลการจัดส่ง</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-sm">
        {carrier && <p>ขนส่ง: {carrier}</p>}
        {trackingNumber && (
          <p>
            เลขพัสดุ: {trackingNumber}{' '}
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(trackingNumber!)}>
              คัดลอก
            </Button>
          </p>
        )}
        {shippedAt && <p>ส่งเมื่อ: {formatDateThai(shippedAt)}</p>}
      </CardContent>
    </Card>
  )
}
