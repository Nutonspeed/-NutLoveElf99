import { promises as fs } from 'fs'
import { join } from 'path'

async function loadCheckin() {
  const file = join(process.cwd(), 'mock', 'store', 'checkin.json')
  try {
    const text = await fs.readFile(file, 'utf8')
    return JSON.parse(text) as any[]
  } catch {
    return []
  }
}

export default async function AdminCheckinPage() {
  const logs = await loadCheckin()
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Daily Check-in</h1>
      <ul className="space-y-2">
        {logs.map((l, i) => (
          <li key={i} className="border rounded p-2 flex items-center gap-2">
            <span>{l.date}</span>
            <span className="text-sm text-gray-500">login {l.loginTime}</span>
            <span className="text-sm text-gray-500">tasks {l.tasks}</span>
            <span className="text-sm text-gray-500">exports {l.exports}</span>
            <label className="ml-auto text-sm flex items-center gap-1">
              <input type="checkbox" defaultChecked={l.done} /> I'm done for today
            </label>
          </li>
        ))}
        {logs.length === 0 && <p>No logs</p>}
      </ul>
    </div>
  )
}
