import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useRouteInfo } from '../use-route-info'

const usePathnameMock = vi.fn()
vi.mock('next/navigation', () => ({
  usePathname: () => usePathnameMock(),
}))

describe('useRouteInfo', () => {
  it('matches static route', () => {
    usePathnameMock.mockReturnValue('/cart')
    const { result } = renderHook(() => useRouteInfo())
    expect(result.current.title).toBe('ตะกร้าสินค้า')
    expect(result.current.category).toBe('cart')
  })

  it('matches dynamic route', () => {
    usePathnameMock.mockReturnValue('/orders/123')
    const { result } = renderHook(() => useRouteInfo())
    expect(result.current.category).toBe('orders')
    expect(result.current.breadcrumb.at(-1)?.href).toBe('/orders/123')
  })
})
