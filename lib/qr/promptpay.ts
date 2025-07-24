import generatePayload from 'promptpay-qr'
import * as QRCode from 'qrcode'

const cache: Record<string, string> = {}

export async function getPromptPayQR(id: string): Promise<string> {
  if (cache[id]) return cache[id]
  const payload = generatePayload(id)
  const dataUrl = await QRCode.toDataURL(payload, { type: 'image/png' })
  const base64 = dataUrl.replace(/^data:image\/png;base64,/, '')
  cache[id] = base64
  return base64
}
