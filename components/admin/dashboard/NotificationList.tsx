"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"

interface Item {
  id: string
  message: string
}

interface NotificationListProps {
  title: string
  items: Item[]
  emptyText: string
}

export default function NotificationList({ title, items, emptyText }: NotificationListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length ? (
          <ul className="list-disc pl-5 space-y-1">
            {items.map(n => (
              <li key={n.id}>{n.message}</li>
            ))}
          </ul>
        ) : (
          <p>{emptyText}</p>
        )}
      </CardContent>
    </Card>
  )
}
