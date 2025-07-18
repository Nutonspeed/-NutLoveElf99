"use client"
import { useFeatureFlags } from '@/contexts/feature-flag-context'

export default function FlagsPage() {
  const { isEnabled, toggle } = useFeatureFlags()
  const flags = ['review', 'newSystem'] as const
  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Feature Flags</h1>
      <ul className="space-y-2">
        {flags.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <label className="capitalize">{f}</label>
            <input type="checkbox" checked={isEnabled(f)} onChange={() => toggle(f)} />
          </li>
        ))}
      </ul>
    </div>
  )
}
