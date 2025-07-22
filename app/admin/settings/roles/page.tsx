"use client"
import { useRoleStore } from '@/core/store'

const actions = ['delete', 'export']

export default function RolesPage() {
  const { roles, set } = useRoleStore()
  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Role Permissions</h1>
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="border px-2">Role</th>
            {actions.map(a => (
              <th key={a} className="border px-2 capitalize">{a}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(roles).map(([role, perms]) => (
            <tr key={role}>
              <td className="border px-2 capitalize">{role}</td>
              {actions.map(a => (
                <td key={a} className="border text-center">
                  <input
                    type="checkbox"
                    checked={perms.includes(a)}
                    onChange={e => {
                      const list = e.target.checked
                        ? [...perms, a]
                        : perms.filter(p => p !== a)
                      set(role as any, list)
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
