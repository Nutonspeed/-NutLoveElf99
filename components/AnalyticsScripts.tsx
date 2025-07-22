'use client'
import Script from 'next/script'

export default function AnalyticsScripts() {
  if (process.env.NODE_ENV !== 'production') return null
  return (
    <>
      <Script id="fb-pixel">
        {`window.fbq = function(){console.log('fbq', arguments)};`}
      </Script>
      <Script id="ga4">
        {`window.gtag = function(){console.log('gtag', arguments)};`}
      </Script>
    </>
  )
}
