import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  addBillingRule,
  runBillingAutomation,
  clearBillingLogs,
  billingRules,
  billingLogs,
} from '../billing-automation'
import { mockOrders } from '../mock-orders'
import * as mockBills from '../mock-bills'

const RULES_KEY = 'billing_rules'
const LOGS_KEY = 'billing_logs'

describe('billing-automation', () => {
  beforeEach(() => {
    billingRules.length = 0
    billingLogs.length = 0
    mockOrders.splice(0, mockOrders.length)
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('addBillingRule stores rule and persists to localStorage', () => {
    const rule = { id: 'r1', name: 'rule1', totalOver: 100, active: true }
    addBillingRule(rule as any)
    expect(billingRules).toHaveLength(1)
    expect(billingRules[0]).toEqual(rule)
    const stored = JSON.parse(localStorage.getItem(RULES_KEY) || '[]')
    expect(stored).toEqual([rule])
  })

  it('runBillingAutomation creates bills and logs for matching orders', () => {
    mockOrders.push({ id: 'o1', total: 200, note: 'coupon' } as any)
    billingRules.push({ id: 'r1', name: 'rule1', hasCoupon: true, active: true })

    const spy = vi.spyOn(mockBills, 'createBill').mockReturnValue({} as any)
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    runBillingAutomation()

    expect(spy).toHaveBeenCalledWith('o1')
    expect(billingLogs).toHaveLength(1)
    expect(billingLogs[0].ruleId).toBe('r1')
    const stored = JSON.parse(localStorage.getItem(LOGS_KEY) || '[]')
    expect(stored).toHaveLength(1)

    logSpy.mockRestore()
  })

  it('clearBillingLogs removes all logs and updates storage', () => {
    billingLogs.push({ id: '1', time: 't', ruleId: 'r', status: 's' })
    localStorage.setItem(LOGS_KEY, JSON.stringify(billingLogs))

    clearBillingLogs()

    expect(billingLogs).toEqual([])
    const stored = JSON.parse(localStorage.getItem(LOGS_KEY) || '[]')
    expect(stored).toEqual([])
  })
})
