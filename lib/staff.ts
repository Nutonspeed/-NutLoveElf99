import { join } from 'path'
import { readJson, writeJson } from './jsonFile'

const file = join(process.cwd(), 'mock', 'store', 'staffs.json')

export interface Staff {
  id: string
  name: string
  username: string
  password: string
  role: 'admin' | 'staff'
  active: boolean
}

export async function listStaffs(): Promise<Staff[]> {
  return readJson<Staff[]>(file, [])
}

export async function getStaff(id: string): Promise<Staff | undefined> {
  const list = await listStaffs()
  return list.find(s => s.id === id)
}

export async function addStaff(data: Omit<Staff, 'id'>): Promise<Staff> {
  const list = await listStaffs()
  const staff: Staff = { id: Date.now().toString(), ...data }
  list.push(staff)
  await writeJson(file, list)
  return staff
}

export async function updateStaff(id: string, data: Partial<Omit<Staff, 'id'>>): Promise<Staff | undefined> {
  const list = await listStaffs()
  const idx = list.findIndex(s => s.id === id)
  if (idx === -1) return undefined
  list[idx] = { ...list[idx], ...data }
  await writeJson(file, list)
  return list[idx]
}

export async function removeStaff(id: string): Promise<boolean> {
  const list = await listStaffs()
  const idx = list.findIndex(s => s.id === id)
  if (idx === -1) return false
  list.splice(idx, 1)
  await writeJson(file, list)
  return true
}
