import fs from 'fs'
import path from 'path'

async function getComponents() {
  const dir = path.join(process.cwd(), 'components')
  const files: string[] = []
  function walk(d: string) {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f)
      const stat = fs.statSync(p)
      if (stat.isDirectory()) walk(p)
      else if (p.endsWith('.tsx')) files.push(path.relative(process.cwd(), p))
    }
  }
  walk(dir)
  return files
}

export default async function ComponentMapPage() {
  const components = await getComponents()
  return (
    <div className="p-4 space-y-2">
      <h1 className="text-xl font-bold">Component Map</h1>
      <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded">
        {JSON.stringify(components, null, 2)}
      </pre>
    </div>
  )
}
