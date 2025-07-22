"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Checkbox } from '@/components/ui/checkbox'
import users from '@/mock/store/users.json'
import { getTeamAccess, updateModule, TeamAccess } from '@/core/mock/store'

const modules: (keyof TeamAccess['modules'])[] = ['bills','shipping','reviews']

export default function TeamSettingsPage() {
  const [access, setAccess] = useState<TeamAccess[]>(getTeamAccess())
  useEffect(() => setAccess(getTeamAccess()), [])

  const toggle = (id: string, mod: keyof TeamAccess['modules']) => {
    updateModule(id, mod, !access.find(u=>u.id===id)?.modules[mod])
    setAccess([...getTeamAccess()])
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
          <h1 className="text-3xl font-bold">Team Access</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">User</th>
                  {modules.map(m=> (
                    <th key={m} className="px-2 capitalize">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(u=> (
                  <tr key={u.id} className="border-t">
                    <td className="py-1 pr-2">{u.name} <span className="text-xs text-gray-500">({u.role})</span></td>
                    {modules.map(m=> (
                      <td key={m} className="text-center">
                        <Checkbox
                          checked={access.find(a=>a.id===u.id)?.modules[m] || false}
                          onCheckedChange={() => toggle(u.id,m)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
