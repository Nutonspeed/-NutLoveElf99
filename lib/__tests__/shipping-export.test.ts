import { describe, it, expect, vi } from 'vitest'
import { submitFlashExpress } from '../shipping-export'

describe('submitFlashExpress', () => {
  it('runs without throwing', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {})
    await expect(submitFlashExpress([])).resolves.toBeUndefined()
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})
