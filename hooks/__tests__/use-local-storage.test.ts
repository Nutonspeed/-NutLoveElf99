import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useLocalStorage } from '../use-local-storage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('reads initial value from localStorage', () => {
    localStorage.setItem('key', JSON.stringify('stored'))
    const { result } = renderHook(() => useLocalStorage('key', 'fallback'))
    expect(result.current[0]).toBe('stored')
  })

  it('writes updates to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', ''))
    act(() => {
      result.current[1]('hello')
    })
    expect(localStorage.getItem('key')).toBe(JSON.stringify('hello'))
  })
})
