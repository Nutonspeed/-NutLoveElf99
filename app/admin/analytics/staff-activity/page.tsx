import { promises as fs } from 'fs'
import { join } from 'path'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Button } from '@/components/ui/buttons/button'

async function loadLogs() {
  const file = join(process.cwd(),'mock','store','activity-log.json')
  try {
    const txt = await fs.readFile(file,'utf8')
    return JSON.parse(txt) as any[]
  } catch {
    return []
  }
}

function buildHeatmap(logs: any[]) {
  const map: Record<string, number[]> = {}
  logs.forEach(l=>{
    const hour = new Date(l.timestamp).getHours()
    const u = l.admin || 'system'
    if(!map[u]) map[u] = Array(24).fill(0)
    map[u][hour]++
  })
  return map
}

export default async function StaffActivityPage() {
  const logs = await loadLogs()
  const heat = buildHeatmap(logs)
  const users = Object.keys(heat)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4">
          <Link href="/admin/analytics">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Staff Activity</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Heatmap (hourly)</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="text-xs">
              <thead>
                <tr>
                  <th>User</th>
                  {Array.from({length:24}).map((_,i)=>(<th key={i}>{i}</th>))}
                </tr>
              </thead>
              <tbody>
                {users.map(u=>(
                  <tr key={u} className="border-t">
                    <td className="pr-2">{u}</td>
                    {heat[u].map((c,i)=>(
                      <td key={i} className={c? 'bg-blue-200 text-center':'text-center'}>{c||''}</td>
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
