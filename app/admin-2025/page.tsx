"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"

export default function Admin2025Dashboard() {
  const items = [
    { title: "Orders", value: 0 },
    { title: "Customers", value: 0 },
    { title: "Revenue", value: 0 },
    { title: "Analytics", value: 0 },
  ]
  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card key={item.title}>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600">{item.title}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
