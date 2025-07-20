"use client"

import { useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { useToast } from "@/hooks/use-toast"

const lastReplies: string[] = []

async function pingAssistant(): Promise<string> {
  // simulate async call returning JSON
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(JSON.stringify({ reply: "pong", time: Date.now() }))
    }, 1000)
  })
}

export default function PingAIPage() {
  const { toast } = useToast()
  const [error, setError] = useState(false)

  const handlePing = async () => {
    setError(false)
    try {
      const result = await Promise.race([
        pingAssistant(),
        new Promise((_ , reject) => setTimeout(() => reject(new Error("timeout")), 1500))
      ]) as string
      toast({ title: "AI assistant connected (mock)" })
      try {
        JSON.parse(result)
        lastReplies.push(result)
        if (lastReplies.length > 3) lastReplies.shift()
        console.log("assistant replies", [...lastReplies])
      } catch (e) {
        setError(true)
        toast({ title: "Invalid reply format", variant: "destructive" })
      }
    } catch {
      setError(true)
      toast({ title: "No response", variant: "destructive" })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center flex-col space-y-4">
      <Button onClick={handlePing}>Ping AI assistant</Button>
      {error && <p className="text-destructive">Mock error connecting to assistant</p>}
    </div>
  )
}
