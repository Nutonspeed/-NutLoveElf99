import { describe, it, expect, beforeEach } from 'vitest'
import { useBillStore } from '../app/store/useBillStore'

describe('bill store', () => {
  beforeEach(() => {
    useBillStore.setState({ bill: { id: 'B1', status: 'unpaid' } as any })
  })

  it('updates status', () => {
    useBillStore.getState().updateStatus('paid')
    expect(useBillStore.getState().bill?.status).toBe('paid')
  })
})
