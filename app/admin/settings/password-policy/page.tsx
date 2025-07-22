"use client"
import { useEffect, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/inputs/input'
import { loadPasswordPolicy, passwordPolicy, setPasswordPolicy } from '@/lib/mock-password-policy'

export default function PasswordPolicyPage() {
  const [policy, setPolicy] = useState(passwordPolicy)
  const [preview, setPreview] = useState('')

  useEffect(() => {
    loadPasswordPolicy()
    setPolicy({ ...passwordPolicy })
  }, [])

  const handleSave = () => setPasswordPolicy(policy)

  const strength = Math.min(
    100,
    (policy.minLength && preview.length >= 8 ? 50 : preview.length * 5) +
      (policy.specialChar && /[^A-Za-z0-9]/.test(preview) ? 50 : 0)
  )

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Password Policy</h1>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox id="min" checked={policy.minLength} onCheckedChange={v=>setPolicy({...policy, minLength: Boolean(v)})} />
          <Label htmlFor="min">Require 8+ characters</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="special" checked={policy.specialChar} onCheckedChange={v=>setPolicy({...policy, specialChar: Boolean(v)})} />
          <Label htmlFor="special">Require special character</Label>
        </div>
        <button className="border px-3 py-1" onClick={handleSave}>Save Policy</button>
      </div>
      <div className="space-y-2 max-w-sm">
        <Input placeholder="Test password" value={preview} onChange={e=>setPreview(e.target.value)} />
        <div className="h-2 bg-gray-200 rounded">
          <div className="h-full bg-green-500 rounded" style={{width: strength + '%'}} />
        </div>
      </div>
    </div>
  )
}
