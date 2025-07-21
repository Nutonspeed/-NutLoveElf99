import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  sendBillNotify,
  billNotifyLog,
  setBillNotifySettings,
  validateBillNotifySettings,
  billNotifySettings,
  billNotifyTemplates,
  billNotifyHistory,
  setChannel,
  setTemplate,
  sendPreview,
  loadBillNotifyData,
} from '../mock-bill-notify'

beforeEach(() => {
  for (const k in billNotifyLog) delete billNotifyLog[k]
  setBillNotifySettings({})
  for (const k in billNotifyTemplates) delete (billNotifyTemplates as any)[k]
  billNotifyHistory.length = 0
  localStorage.clear()
})

describe('mock-bill-notify', () => {
  it('records notify status', async () => {
    setBillNotifySettings({ b1: { message: 'hi' } })
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    const res = await sendBillNotify('b1')
    expect(res).toBe(true)
    expect(billNotifyLog['b1'].status).toBe('sent')
    vi.restoreAllMocks()
  })

  it('validateBillNotifySettings works', () => {
    const valid = { a: { message: 'x', line: true } }
    const invalid = { b: { foo: 'bar' } }
    expect(validateBillNotifySettings(valid)).toBe(true)
    expect(validateBillNotifySettings(invalid)).toBe(false)
  })

  it('setChannel and setTemplate persist to localStorage', () => {
    setChannel('dueSoon', 'email', true)
    setTemplate('dueSoon', 'hello {{billId}}')
    expect(billNotifySettings.dueSoon.email).toBe(true)
    const storedSettings = JSON.parse(localStorage.getItem('billNotifySettings') || '{}')
    expect(storedSettings.dueSoon.email).toBe(true)
    const storedTemplate = JSON.parse(localStorage.getItem('billNotifyTemplates') || '{}')
    expect(storedTemplate.dueSoon).toBe('hello {{billId}}')
  })

  it('sendPreview adds history using template', () => {
    setChannel('dueSoon', 'email', true)
    setTemplate('dueSoon', 'msg {{billId}}')
    sendPreview('B1', 'dueSoon')
    expect(billNotifyHistory.length).toBe(1)
    expect(billNotifyHistory[0].message).toBe('msg B1')
    const stored = JSON.parse(localStorage.getItem('billNotifyHistory') || '[]')
    expect(stored.length).toBe(1)
  })

  it('loadBillNotifyData restores state from storage', () => {
    localStorage.setItem('billNotifyTemplates', JSON.stringify({ dueSoon: 'x' }))
    localStorage.setItem(
      'billNotifyHistory',
      JSON.stringify([{ id: '1', billId: 'b', status: 'dueSoon', channel: 'email', message: 'x', timestamp: 't' }]),
    )
    loadBillNotifyData()
    expect(billNotifyTemplates.dueSoon).toBe('x')
    expect(billNotifyHistory.length).toBe(1)
  })
})
