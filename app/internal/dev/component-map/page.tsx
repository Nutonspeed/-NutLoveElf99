import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Component Map'
}

function getComponents() {
  const dir = path.join(process.cwd(), 'components')
  const files = fs.readdirSync(dir)
  return files.filter(f => f.endsWith('.tsx'))
}

export default function ComponentMapPage() {
  const list = getComponents()
  return (
    <div className="p-4 space-y-2">
      <h1 className="text-2xl font-bold">Component Map</h1>
      <pre className="bg-muted p-4 rounded-md text-sm">
        {JSON.stringify(list, null, 2)}
      </pre>
    </div>
  )
}
