export function trackPixel(event: string, params: Record<string, any> = {}): void {
  if (typeof window === 'undefined') return

  if (typeof (window as any).gtag === 'function') {
    ;(window as any).gtag('event', event, params)
  }

  if (typeof (window as any).fbq === 'function') {
    ;(window as any).fbq('trackCustom', event, params)
  }
}
