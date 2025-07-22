import { promises as fs } from 'fs'
import { join } from 'path'

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
          <li key={i} className="border rounded p-2">
            <p className="text-sm text-gray-500">{l.timestamp} - {l.admin}</p>
            <p>{l.action}</p>
          </li>
        ))}
        {logs.length === 0 && <p>No logs</p>}
      </ul>
    </div>
  )
}
