import { renderHook } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('useAdminGuard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
    document.cookie = ''
  })

  it('redirects unauthenticated users to /login', async () => {
    const replace = vi.fn()
    vi.doMock('next/navigation', () => ({ useRouter: () => ({ replace }) }))
    vi.doMock('../auth-context', () => ({
      useAuth: () => ({ user: null, isAuthenticated: false }),
    }))
    const mod = await import('../use-admin-guard')
    renderHook(() => mod.useAdminGuard())
    expect(replace).toHaveBeenCalledWith('/login')
  })

  it('redirects non-admin users to /', async () => {
    const replace = vi.fn()
    vi.doMock('next/navigation', () => ({ useRouter: () => ({ replace }) }))
    vi.doMock('../auth-context', () => ({
      useAuth: () => ({
        user: { id: '1', name: 't', email: 't@test', role: 'customer' },
        isAuthenticated: true,
      }),
    }))
    const mod = await import('../use-admin-guard')
    renderHook(() => mod.useAdminGuard())
    expect(replace).toHaveBeenCalledWith('/')
  })
})
