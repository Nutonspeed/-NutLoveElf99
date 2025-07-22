import data from '@/mock/store/team-access.json'
import { loadFromStorage, saveToStorage } from './persist'

export interface ModuleAccess {
  bills: boolean
  shipping: boolean
  reviews: boolean
}

export interface TeamAccess {
  id: string
  role: string
  modules: ModuleAccess
}

const KEY = 'mockStore_team_access'
let access: TeamAccess[] = loadFromStorage<TeamAccess[]>(KEY, data as TeamAccess[])

function persist() {
  saveToStorage(KEY, access)
}

export function getTeamAccess() {
  return access
}

export function setTeamAccess(a: TeamAccess[]) {
  access = a
  persist()
}

export function updateModule(id: string, module: keyof ModuleAccess, value: boolean) {
  const idx = access.findIndex(u => u.id === id)
  if (idx !== -1) {
    access[idx].modules[module] = value
    persist()
  }
}
