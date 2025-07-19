import { describe, it, expect } from 'vitest'
import { resetStore, generateMockData, getTiers, getRedeems } from '../store'

describe('reset store', () => {
  it('generates default data', () => {
    resetStore()
    generateMockData()
    expect(getTiers().length).toBeGreaterThan(0)
    expect(getRedeems()).toEqual([])
  })
})
