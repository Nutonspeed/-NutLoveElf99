export function trackFb(event: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
    ;(window as any).fbq('track', event, params)
  }
}

export function initFacebookPixel(id: string) {
  if (typeof window === 'undefined' || (window as any).fbq) return
  !(function (f: any, b: any, e: string, v: string, n?: any, t?: any, s?: any) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = true
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  ;(window as any).fbq('init', id)
}
