export const ADMIN_LAST_ACTIVE_KEY = 'adminLastActive'

export function recordAdminActivity() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ADMIN_LAST_ACTIVE_KEY, Date.now().toString())
  }
}

export function shouldRemindAdmin(): boolean {
  if (typeof window === 'undefined') return false
  const last = localStorage.getItem(ADMIN_LAST_ACTIVE_KEY)
  if (!last) return true
  const lastTime = parseInt(last, 10)
  return Date.now() - lastTime > 5 * 24 * 60 * 60 * 1000
}
