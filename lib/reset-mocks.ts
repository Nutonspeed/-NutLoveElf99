import { resetMockOrders } from './mock-orders'
import { resetMockCustomers } from './mock-customers'
import { mockCollections } from './mock-collections'
import { chatMessages } from './mock-chat-messages'
import { chatBills } from './mock-chat-bills'
import { chatActivity } from './mock-chat-activity'
import { mockFeedbacks } from './mock-feedback'
import { mockClaims } from './mock-claims'
import { resetDeliverySchedule } from './mock-delivery-schedule'

export function resetAllMockData() {
  resetMockOrders()
  resetMockCustomers()
  mockCollections.length = 0
  Object.keys(chatMessages).forEach((k) => delete chatMessages[k])
  chatBills.length = 0
  chatActivity.length = 0
  mockFeedbacks.length = 0
  mockClaims.length = 0
  resetDeliverySchedule()
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin-collections')
    localStorage.removeItem('chatBills')
    localStorage.removeItem('chatActivity')
    localStorage.removeItem('feedbacks')
    localStorage.removeItem('claims')
    localStorage.removeItem('mockDeliverySchedule')
  }
}
