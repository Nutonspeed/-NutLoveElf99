import { promises as fs } from 'fs'
import { join } from 'path'

const file = join(process.cwd(), 'temp', 'undo-store.json')

export interface UndoEntry {
  type: string
  payload: any
}

async function readFileSafe(): Promise<UndoEntry | null> {
  try {
    const text = await fs.readFile(file, 'utf8')
    const data = JSON.parse(text)
    if (data.type) return data
    return null
  } catch {
    return null
  }
}

export async function saveUndo(entry: UndoEntry) {
  await fs.mkdir(join(process.cwd(), 'temp'), { recursive: true })
  await fs.writeFile(file, JSON.stringify(entry, null, 2), 'utf8')
}

export async function loadUndo() {
  return readFileSafe()
}

export async function clearUndo() {
  try { await fs.unlink(file) } catch {}
}
