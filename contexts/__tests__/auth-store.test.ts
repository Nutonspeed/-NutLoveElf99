import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '../auth-store'
import { mockUsers } from '@/lib/mock-users'

function resetStore() {
  const state = useAuthStore.getState()
  useAuthStore.setState({
    ...state,
    user: null,
    guestId: `guest-${crypto.randomUUID()}`,
    isLoading: false,
  })
}

describe('useAuthStore', () => {
  beforeEach(() => {
    localStorage.clear()
    useAuthStore.persist.clearStorage()
    resetStore()
  })

  it('login succeeds with correct credentials', async () => {
    const email = mockUsers[0].email
    const success = await useAuthStore.getState().login(email, 'password')
    expect(success).toBe(true)
    expect(useAuthStore.getState().user?.email).toBe(email)
  })

  it('logout clears localStorage', async () => {
    const email = mockUsers[0].email
    await useAuthStore.getState().login(email, 'password')
    expect(localStorage.getItem('auth')).not.toBeNull()
    useAuthStore.getState().logout()
    expect(localStorage.getItem('auth')).toBeNull()
  })

  it('persists user when remember-me is enabled', async () => {
    const email = mockUsers[0].email
    await useAuthStore.getState().login(email, 'password')
    expect(localStorage.getItem('auth')).not.toBeNull()

    resetStore()
    await useAuthStore.persist.rehydrate()

    expect(useAuthStore.getState().user?.email).toBe(email)
  })
})
