"use client"

import { useState } from "react"
import { mockComponents } from "@/mock/mock-components"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"

export default function ComponentTestPage() {
  const [name, setName] = useState(mockComponents[0].name)
  const selected = mockComponents.find((c) => c.name === name)!
  const Comp = selected.Component

  return (
    <div className="min-h-screen p-4 space-y-4">
      <select
        className="border rounded p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      >
        {mockComponents.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <Card>
        <CardHeader>
          <CardTitle>Sandbox Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <Comp {...selected.props} />
        </CardContent>
      </Card>
    </div>
  )
}
