import GalleryClient from './GalleryClient'
import { headers } from 'next/headers'
import type { Metadata } from 'next'

export function generateMetadata(): Metadata {
  const lang = headers().get('accept-language') || ''
  const th = lang.includes('th')
  const title = th ? 'แกลเลอรีสินค้า' : 'Product Gallery'
  const description = th ? 'เลือกชมสินค้าทั้งหมดของเรา' : 'Browse all our products.'
  const image = '/og-gallery.png'
  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: image }] },
  }
}

export default function GalleryPage() {
  return <GalleryClient />
}
