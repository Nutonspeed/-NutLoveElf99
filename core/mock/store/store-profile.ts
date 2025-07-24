import data from '@/mock/store/config/store-profile.json'
import { loadFromStorage, saveToStorage } from './persist'

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

const KEY = 'mockStore_profile'
let profile: StoreProfile = loadFromStorage<StoreProfile>(KEY, data as StoreProfile)

function persist() {
  saveToStorage(KEY, profile)
}

export function getStoreProfile() {
  return profile
}

export function setStoreProfile(newProfile: StoreProfile) {
  profile = { ...profile, ...newProfile }
  persist()
}
