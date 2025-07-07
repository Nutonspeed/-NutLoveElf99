"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDevPage() {
  const { user, isAuthenticated } = useAuth()
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Diagnostic Info</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap break-all text-sm bg-gray-100 p-4 rounded">
            {JSON.stringify({ isAuthenticated, user }, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
