import { promises as fs } from 'fs'
import { join } from 'path'
import { Badge } from '@/components/ui/badge'

async function loadLogs() {
  const file = join(process.cwd(), 'mock', 'store', 'activity-log.json')
  try {
    const text = await fs.readFile(file, 'utf8')
    return JSON.parse(text) as any[]
  } catch {
    return []
  }
}

export default async function OrderLogsPage() {
  const logs = await loadLogs()
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Order Activity Log</h1>
      <ul className="space-y-2">
        {logs.map((l, i) => (
          <li key={i} className="border rounded p-2 space-y-1">
            <p className="text-sm text-gray-500 flex gap-2 items-center">
              {l.timestamp} - {l.admin}
              {l.role && <Badge variant="secondary">{l.role}</Badge>}
            </p>
            <p className="flex items-center gap-2">
              {l.action}
              {actionTag(l.action)}
            </p>
          </li>
        ))}
        {logs.length === 0 && <p>No logs</p>}
      </ul>
    </div>
  )
}

function actionTag(action: string) {
  if (action.toLowerCase().includes('created'))
    return <Badge variant="outline" className="bg-green-100 text-green-700">Created</Badge>
  if (action.toLowerCase().includes('paid'))
    return <Badge variant="outline" className="bg-blue-100 text-blue-700">Paid</Badge>
  if (action.toLowerCase().includes('export'))
    return <Badge variant="outline" className="bg-purple-100 text-purple-700">Exported</Badge>
  return null
}
