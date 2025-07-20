"use client"

import { useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/buttons/button"
import {
  getAssistantSuggestions,
  recordAssistantAction,
  loadAssistantActions,
  getAssistantActions,
  type AssistantSuggestion,
} from "@/lib/mock-assistant"

export default function AssistantSidebar({ className = "" }: { className?: string }) {
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState<AssistantSuggestion[]>([])
  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    loadAssistantActions()
    setHistory(getAssistantActions())
  }, [])

  const handleSend = () => {
    const list = getAssistantSuggestions(input)
    setSuggestions(list)
  }

  const accept = (text: string) => {
    recordAssistantAction(text)
    setHistory(getAssistantActions())
    setSuggestions([])
  }

  const cancel = (id: string) => {
    setSuggestions((cur) => cur.filter((s) => s.id !== id))
  }

  const exportData = (type: "csv" | "json") => {
    const data =
      type === "csv"
        ? suggestions.map((s) => `"${s.text}"`).join("\n")
        : JSON.stringify(suggestions.map((s) => s.text), null, 2)
    const blob = new Blob([data], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `suggestions.${type}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <aside className={`w-60 border-l p-4 space-y-3 ${className}`}> 
      <h2 className="font-bold">Assistant</h2>
      <Textarea
        placeholder="Ask the assistant"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button className="w-full" onClick={handleSend}>
        Send
      </Button>
      {suggestions.length === 0 && (
        <p className="text-sm text-muted-foreground">No suggestions found</p>
      )}
      {suggestions.length > 0 && (
        <ul className="space-y-2">
          {suggestions.map((s) => (
            <li key={s.id} className="border p-2 rounded text-sm space-y-2">
              <p>{s.text}</p>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => cancel(s.id)}>
                  Cancel
                </Button>
                <Button variant="secondary" size="sm" onClick={() => accept(s.text)}>
                  Accept
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {suggestions.length > 0 && (
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => exportData("csv")}>CSV</Button>
          <Button variant="outline" size="sm" onClick={() => exportData("json")}>JSON</Button>
        </div>
      )}
      {history.length > 0 && (
        <div>
          <h3 className="mt-4 text-sm font-semibold">Recent Actions</h3>
          <ul className="list-disc pl-4 text-sm space-y-1">
            {history.map((h, idx) => (
              <li key={idx}>{h}</li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}

