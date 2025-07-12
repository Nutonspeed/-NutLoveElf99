import { NotificationService } from '../notification-service'
import { describe, it, expect, vi } from 'vitest'

const dummyData = {
  productName: 'Sofa',
  productId: '1',
  currentStock: 5,
  minStock: 10,
  location: 'A1',
}

describe('NotificationService', () => {
  it('sends email and records history', async () => {
    const service = new NotificationService() as any
    service.emailService = { sendEmail: vi.fn().mockResolvedValue(true) }
    service.smsService = { sendSMS: vi.fn().mockResolvedValue(true) }
    service.lineService = { sendLineNotify: vi.fn().mockResolvedValue(true) }

    const result = await service.sendNotification({
      type: 'stock_low',
      recipient: { email: 'test@example.com' },
      data: dummyData,
      priority: 'normal',
    })

    expect(result).toBe(true)
    expect(service.getHistory()).toHaveLength(2)
    const entry = service.getHistory()[0]
    expect(entry.channel).toBe('line')
    const emailEntry = service.getHistory()[1]
    expect(emailEntry.recipient).toBe('test@example.com')
    expect(service.emailService.sendEmail).toHaveBeenCalled()
  })
})
