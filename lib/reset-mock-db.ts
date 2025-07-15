import { resetMockOrders } from './mock-orders'
import { resetMockCustomers } from './mock-customers'
import { mockAdminLogs } from './mock-admin-logs'
import { mockBills } from './bills'

export function resetMockDB() {
  resetMockOrders()
  resetMockCustomers()
  mockAdminLogs.length = 0
  mockBills.length = 0
  if (typeof window !== 'undefined') {
    localStorage.clear()
  }
}
