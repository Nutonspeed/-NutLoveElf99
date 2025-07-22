import { BadgeCheck, PackageCheck, ShieldCheck } from 'lucide-react'
import { Card } from '@/components/ui/cards/card'
import { Button } from '@/components/ui/buttons/button'
import Link from 'next/link'
import { headers } from 'next/headers'
import type { Metadata } from 'next'

export function generateMetadata(): Metadata {
  const lang = headers().get('accept-language') || ''
  const th = lang.includes('th')
  return {
    title: th ? 'ตรารับรองร้านค้า' : 'Store Badges',
    description: th ? 'รับประกันความน่าเชื่อถือของร้านเรา' : 'Trust badges of our store',
  }
}

export default function BadgePage() {
  const list = [
    { icon: PackageCheck, titleTh: 'จัดส่งรวดเร็ว', titleEn: 'Fast Shipping', descTh: 'ส่งไวถึงหน้าบ้านคุณ', descEn: 'Quick delivery nationwide' },
    { icon: BadgeCheck, titleTh: 'ร้านค้าชั้นนำ', titleEn: 'Top Seller', descTh: 'ลูกค้าไว้วางใจกว่า 10,000 ราย', descEn: 'Trusted by thousands' },
    { icon: ShieldCheck, titleTh: 'ของแท้', titleEn: 'Authentic', descTh: 'รับประกันสินค้าแท้ 100%', descEn: '100% genuine products' },
  ]
  const lang = typeof document !== 'undefined' ? document.documentElement.lang : 'th'
  const th = lang === 'th'
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">{th ? 'ตรารับรองจากร้านเรา' : 'Our Trust Badges'}</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        {list.map((b) => (
          <Card key={b.titleEn} className="p-4 text-center space-y-2">
            <b.icon className="h-8 w-8 mx-auto text-primary" />
            <h2 className="font-semibold">{th ? b.titleTh : b.titleEn}</h2>
            <p className="text-sm text-muted-foreground">{th ? b.descTh : b.descEn}</p>
          </Card>
        ))}
      </div>
      <div className="text-center">
        <Link href="/store/reviews">
          <Button>{th ? 'อ่านรีวิวลูกค้า' : 'See Customer Reviews'}</Button>
        </Link>
      </div>
    </div>
  )
}
