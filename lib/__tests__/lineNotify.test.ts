import { describe, it, expect, vi } from 'vitest'
import { sendLineMessage } from '../lineNotify'

describe('sendLineMessage', () => {
  it('logs when no token', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    const ok = await sendLineMessage('U1', 'hi')
    expect(ok).toBe(true)
    expect(console.log).toHaveBeenCalled()
    vi.restoreAllMocks()
  })
})
