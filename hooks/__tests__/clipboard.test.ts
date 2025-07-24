import { describe, it, expect, vi } from 'vitest'

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

import { copyToClipboard } from '@/helpers/clipboard'
import { toast } from 'sonner'

describe('copyToClipboard', () => {
  it('shows error toast on failure', async () => {
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn().mockRejectedValue(new Error('fail')),
      },
    } as any)

    await copyToClipboard('text')

    expect(toast.error).toHaveBeenCalled()
    expect(toast.success).not.toHaveBeenCalled()
  })
})
