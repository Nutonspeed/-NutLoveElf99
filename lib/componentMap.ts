import { promises as fs } from 'fs'
import path from 'path'

export interface ComponentUsage {
  component: string
  pages: string[]
}

async function walk(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(entry => {
      const res = path.join(dir, entry.name)
      return entry.isDirectory() ? walk(res) : res
    })
  )
  return files.flat()
}

export async function generateComponentMap(root = process.cwd()): Promise<ComponentUsage[]> {
  const componentsDir = path.join(root, 'components')
  const appDir = path.join(root, 'app')

  const componentFiles = (await walk(componentsDir)).filter(f => f.endsWith('.tsx'))
  const componentNames = componentFiles.map(f => path.relative(componentsDir, f).replace(/\.tsx$/, ''))

  const pageFiles = (await walk(appDir)).filter(f => f.endsWith('page.tsx'))

  const usage: Record<string, string[]> = {}
  for (const page of pageFiles) {
    const content = await fs.readFile(page, 'utf8')
    const regex = /from\s+["']@\/components\/([^"']+)["']/g
    let match
    while ((match = regex.exec(content))) {
      const comp = match[1].replace(/\.tsx?$/, '')
      const rel = path.relative(appDir, page)
      if (!usage[comp]) usage[comp] = []
      if (!usage[comp].includes(rel)) usage[comp].push(rel)
    }
  }

  return componentNames.map(name => ({ component: name, pages: usage[name] || [] }))
}
