"use client"
import { useEffect } from 'react'
import Script from 'next/script'
import { isPixelEnabled } from '@/lib/system-config'
import { initFacebookPixel } from '@/lib/analytics'

export default function FacebookPixel() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID
    if (!id || !isPixelEnabled()) return
    initFacebookPixel(id)
  }, [])

  if (!isPixelEnabled() || !process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID) return null
  return (
    <Script id="fb-pixel" strategy="afterInteractive">
      {`fbq('track', 'PageView');`}
    </Script>
  )
}
