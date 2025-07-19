"use client"
import Guard from "@/components/Guard"
import { useAuth } from "@/contexts/auth-context"
import { useAuthStore } from "@/contexts/auth-store"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import type { Role } from "@/lib/mock-roles"

export default function AuthDevtoolsPage() {
  const { user, logout } = useAuth()
  const { setUser } = useAuthStore()

  const changeRole = (r: Role) => {
    if (user) setUser({ ...user, role: r })
  }

  return (
    <Guard role={["admin", "staff"]}>
      <div className="container mx-auto py-8 space-y-4">
        <h1 className="text-2xl font-bold">Auth Devtools</h1>
        <Card>
          <CardHeader>
            <CardTitle>Current User</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{JSON.stringify(user, null, 2)}
            </pre>
            <div className="flex gap-2 mt-4">
              <Button onClick={logout}>Reset</Button>
              <Button variant="outline" onClick={() => changeRole("admin")}>Admin</Button>
              <Button variant="outline" onClick={() => changeRole("staff")}>Staff</Button>
              <Button variant="outline" onClick={() => changeRole("customer")}>Customer</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Guard>
  )
}
