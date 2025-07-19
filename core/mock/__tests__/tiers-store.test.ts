import { describe, it, expect, beforeEach } from 'vitest'
import { getTiers, addTier, resetTiers } from '../store'

describe('tier store', () => {
  beforeEach(() => {
    resetTiers()
  })

  it('adds tier', () => {
    const prev = getTiers().length
    addTier({ name: 'Test', minSpent: 1 })
    expect(getTiers().length).toBe(prev + 1)
  })
})
