import { promises as fs } from 'fs'

export async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const text = await fs.readFile(file, 'utf8')
    return JSON.parse(text) as T
  } catch {
    return fallback
  }
}

export async function writeJson<T>(file: string, data: T): Promise<void> {
  await fs.mkdir(require('path').dirname(file), { recursive: true })
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8')
}
