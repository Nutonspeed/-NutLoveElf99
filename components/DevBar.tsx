"use client"
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useAuth } from '@/contexts/auth-context'
import { setEnv, getEnv, EnvMode } from '@/lib/system-config'
import { useFeatureFlags } from '@/contexts/feature-flag-context'
import { useDemo } from '@/contexts/demo-context'
import { APP_VERSION, GIT_BRANCH, GIT_COMMIT } from '@/lib/version'

export default function DevBar() {
  const { setTheme, resolvedTheme } = useTheme()
  const { logout } = useAuth()
  const { toggle } = useFeatureFlags()
  const { toggle: toggleDemo } = useDemo()
  const [env, setEnvState] = useState<EnvMode>(getEnv())

  useEffect(() => {
    setEnv(env)
  }, [env])

  return (
    <div className="fixed bottom-2 right-2 z-50 space-x-2 bg-gray-100 border px-2 py-1 rounded shadow text-sm">
      <button onClick={() => {
        localStorage.clear();
        location.reload();
      }}>Reset Mock</button>
      <button onClick={() => logout()}>Reset Auth</button>
      <button onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
      <button onClick={() => toggle('review')}>Toggle Review</button>
      <button onClick={toggleDemo}>Demo Mode</button>
      <select value={env} onChange={e => setEnvState(e.target.value as EnvMode)} className="border ml-2">
        <option value="development">dev</option>
        <option value="preview">preview</option>
        <option value="production">prod</option>
      </select>
      <span className="ml-2">{APP_VERSION}</span>
    </div>
  )
}
