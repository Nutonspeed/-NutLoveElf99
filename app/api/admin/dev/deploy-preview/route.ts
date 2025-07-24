import { NextResponse } from 'next/server'
import { join } from 'path'
import { readJson, writeJson } from '@/lib/server/jsonFile'

export async function POST() {
  const dir = join(process.cwd(), 'mock', 'store')
  const file = join(dir, 'deploy-log.json')
  const log = await readJson<any[]>(file, [])
  const timestamp = new Date().toISOString()
  log.push({ timestamp })
  await writeJson(file, log)
  return NextResponse.json({ timestamp })
}
