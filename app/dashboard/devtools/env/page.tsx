"use client"
import { getEnv, setEnv, EnvMode } from '@/lib/system-config'
import { useState } from 'react'

export default function EnvPage() {
  const [env, setEnvState] = useState<EnvMode>(getEnv())
  const handle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as EnvMode
    setEnvState(val)
    setEnv(val)
  }
  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Environment Mode</h1>
      <select value={env} onChange={handle} className="border p-1">
        <option value="development">development</option>
        <option value="preview">preview</option>
        <option value="production">production</option>
      </select>
    </div>
  )
}
