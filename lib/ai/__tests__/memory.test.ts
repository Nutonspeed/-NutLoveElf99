import { describe, it, expect } from 'vitest'
import { rememberAction, getLastActions } from '@/lib/ai/memory'

describe('memory', () => {
  it('stores and retrieves last actions', () => {
    localStorage.clear()
    rememberAction('test-action')
    const actions = getLastActions()
    expect(actions[actions.length - 1].action).toBe('test-action')
  })
})
