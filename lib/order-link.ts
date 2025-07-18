export function buildOrderTrackLink(orderId: string): string | null {
  if (typeof window === "undefined") return null
  return `${window.location.origin}/order-track/${orderId}`
}
