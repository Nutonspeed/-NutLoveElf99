export interface FlashResponse {
  success: boolean
  trackingNumber?: string
  error?: string
}

export async function submitFlashShipment(bill: any): Promise<FlashResponse> {
  const payload = {
    apiKey: process.env.FLASH_API_KEY,
    userId: process.env.FLASH_USER_ID,
    bill,
  }
  console.log('📦 Flash payload', payload)
  await new Promise(resolve => setTimeout(resolve, 800))
  const ok = Math.random() > 0.2
  const response: FlashResponse = ok
    ? { success: true, trackingNumber: `TH${Math.floor(Math.random() * 1e10)}` }
    : { success: false, error: 'mock error' }
  console.log('📦 Flash response', response)
  return response
}
