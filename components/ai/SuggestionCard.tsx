"use client"

import { Card } from "@/components/ui/cards/card"

export default function SuggestionCard({ suggestion }: { suggestion?: string }) {
  if (!suggestion) {
    return (
      <Card className="p-4 text-muted-foreground">No suggestion</Card>
    )
  }
  return <Card className="p-4">{suggestion}</Card>
}
