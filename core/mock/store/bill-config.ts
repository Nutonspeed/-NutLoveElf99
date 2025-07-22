import data from '@/mock/store/bill-config.json'
import { loadFromStorage, saveToStorage } from './persist'

export interface BillConfig {
  autoBillOnPayment: boolean
  autoMarkShipped: boolean
}

const KEY = 'mockStore_bill_config'
let config: BillConfig = loadFromStorage<BillConfig>(KEY, data as BillConfig)

function persist() {
  saveToStorage(KEY, config)
}

export function getBillConfig() {
  return config
}

export function setBillConfig(update: Partial<BillConfig>) {
  config = { ...config, ...update }
  persist()
}
