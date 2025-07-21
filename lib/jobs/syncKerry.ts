import { getAllBills } from '../bills'
import { syncKerryStatuses } from '../kerryApi'

export async function runKerryBatchSync() {
  await syncKerryStatuses(getAllBills())
}
