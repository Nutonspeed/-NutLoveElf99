export interface StoreProfile {
  storeName: string
  phoneNumber: string
  address: string
  logoUrl: string
  promptPayId: string
  bankName: string
  accountName: string
  accountNumber: string
}

export const USE_SUPABASE = false
export const ENABLE_MOCK_DASHBOARD = false

export const dataMode: 'mock' | 'real' =
  (process.env.NEXT_PUBLIC_DATA_MODE as 'mock' | 'real') || 'mock'

export async function getStoreProfile(): Promise<StoreProfile> {
  const res = await fetch('/api/config/store-profile')
  return res.json()
}

export async function saveStoreProfile(profile: StoreProfile) {
  await fetch('/api/config/store-profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  })
}
