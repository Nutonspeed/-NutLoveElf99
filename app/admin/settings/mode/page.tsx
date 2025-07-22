"use client"
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getEnv, setEnv, EnvMode } from '@/lib/system-config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Button } from '@/components/ui/buttons/button'

export default function ModePage() {
  const [mode,setMode] = useState<EnvMode>(getEnv())
  const change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value as EnvMode
    setMode(v); setEnv(v)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4">
          <Link href="/admin/settings">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">System Mode</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <select value={mode} onChange={change} className="border p-1">
              <option value="development">dev</option>
              <option value="production">prod</option>
            </select>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
