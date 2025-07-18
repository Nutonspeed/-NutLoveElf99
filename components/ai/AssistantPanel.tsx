"use client"

import SuggestionCard from "./SuggestionCard"
import { useAssistant } from "@/hooks/useAssistant"

export default function AssistantPanel() {
  const { suggestions } = useAssistant()

  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        AI assistant unavailable
      </div>
    )
  }

  return (
    <div className="grid gap-2">
      {suggestions.map((s, idx) => (
        <SuggestionCard key={idx} suggestion={s} />
      ))}
    </div>
  )
}
