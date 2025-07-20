import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useMockNotification } from '../use-mock-notification'

describe('useMockNotification', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      json: () => Promise.resolve({ success: true })
    })) as any)
  })

  it('calls notification API', async () => {
    const { result } = renderHook(() => useMockNotification())
    let ok: boolean | undefined
    await act(async () => {
      ok = await result.current.sendNotification({
        type: 'order_created',
        recipient: {},
        data: {},
        priority: 'normal'
      })
    })
    expect(ok).toBe(true)
    expect(fetch).toHaveBeenCalledWith('/api/notifications/send', expect.anything())
  })
})
