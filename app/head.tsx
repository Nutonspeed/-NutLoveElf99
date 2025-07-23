import { headers } from 'next/headers'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const lang = headers().get('accept-language') || ''
  const th = lang.includes('th')
  const title = th ? 'โซฟาคัฟเวอร์ โปร ร้านผ้าคลุมโซฟา' : 'SofaCover Pro Premium Sofa Covers'
  const description = th ? 'ซื้อผ้าคลุมโซฟาคุณภาพและบริการครบวงจร' : 'Premium sofa covers with great service.'
  const image = '/og-home.png'
  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: image }] },
  }
}
