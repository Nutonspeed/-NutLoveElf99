import { syncFlashStatuses } from '../flashApi'
import { mockBills } from '@/mock/bills'

export async function run() {
  await syncFlashStatuses(mockBills)
  console.log('Flash sync job executed')
}
