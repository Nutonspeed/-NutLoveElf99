import { create } from 'zustand'
import { getRoles, setRolePermissions, type RoleName, type RolePermissions } from '@/core/mock/store'

interface RoleStore {
  roles: RolePermissions
  set: (role: RoleName, perms: string[]) => void
  refresh: () => void
}

export const useRoleStore = create<RoleStore>((set) => ({
  roles: getRoles(),
  set: (role, perms) => {
    setRolePermissions(role, perms)
    set({ roles: getRoles() })
  },
  refresh: () => set({ roles: getRoles() })
}))
