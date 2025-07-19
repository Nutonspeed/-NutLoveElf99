export interface MaintenanceMode {
  enabled: boolean
  message: string
}

const STORAGE_KEY = 'storeMaintenanceMode'

export let storeMaintenanceMode: MaintenanceMode = {
  enabled: false,
  message: 'กำลังปิดปรับปรุง',
}

export function loadStoreMaintenanceMode() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) storeMaintenanceMode = JSON.parse(stored)
  }
}

export function setStoreMaintenanceMode(val: MaintenanceMode) {
  storeMaintenanceMode = val
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }
}
