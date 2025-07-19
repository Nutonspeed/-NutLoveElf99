"use client"
import { Button } from '@/components/ui/buttons/button'
import { sendBroadcast, createSupportTicket } from '@/lib/automation'

export default function AutomationActionsPage() {
  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Automation Actions (mock)</h1>
      <div className="flex gap-2">
        <Button onClick={() => sendBroadcast({ message: 'hello' })}>Test Broadcast</Button>
        <Button onClick={() => createSupportTicket({ note: 'unpaid 48h' })}>Test Ticket</Button>
      </div>
    </div>
  )
}
