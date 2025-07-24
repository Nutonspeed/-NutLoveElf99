import { readJson } from "./jsonFile"
export interface Staff {
  id: string
  name: string
  username: string
  password: string
  role: 'admin' | 'staff'
  active: boolean
}

const url = '/mock/store/staffs.json'

export async function listStaffs(): Promise<Staff[]> {
  return readJson<Staff[]>(url, [])
}

export async function getStaff(id: string): Promise<Staff | undefined> {
  const list = await listStaffs()
  return list.find(s => s.id === id)
}

export async function addStaff(data: Omit<Staff, 'id'>): Promise<Staff> {
  const res = await fetch('/api/staffs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function updateStaff(id: string, data: Partial<Omit<Staff, 'id'>>): Promise<Staff | undefined> {
  const res = await fetch(`/api/staffs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) return undefined
  return res.json()
}

export async function removeStaff(id: string): Promise<boolean> {
  const res = await fetch(`/api/staffs/${id}`, { method: 'DELETE' })
  if (!res.ok) return false
  const result = await res.json()
  return !!result.success
}
