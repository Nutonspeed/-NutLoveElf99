export function generateQRUrl(data: string): string {
  const encoded = encodeURIComponent(data)
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}`
}
