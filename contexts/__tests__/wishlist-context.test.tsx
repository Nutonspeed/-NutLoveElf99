import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { WishlistProvider, useWishlist } from '../wishlist-context'

function wrapper({ children }: { children: React.ReactNode }) {
  return <WishlistProvider>{children}</WishlistProvider>
}

describe('WishlistProvider', () => {
  beforeEach(() => {
    (globalThis as any).React = React
    localStorage.clear()
  })

  it('toggles items in wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper })
    act(() => result.current.toggleWishlist('a'))
    expect(result.current.wishlist).toContain('a')
    expect(JSON.parse(localStorage.getItem('wishlist') || '[]')).toContain('a')
    act(() => result.current.toggleWishlist('a'))
    expect(result.current.wishlist).not.toContain('a')
  })
})
