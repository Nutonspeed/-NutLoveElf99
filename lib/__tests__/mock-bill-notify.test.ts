import { describe, it, expect, beforeEach, vi } from 'vitest'
import { sendBillNotify, billNotifyLog, setBillNotifySettings, validateBillNotifySettings } from '../mock-bill-notify'

beforeEach(() => {
  for (const k in billNotifyLog) delete billNotifyLog[k]
  setBillNotifySettings({})
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
})
