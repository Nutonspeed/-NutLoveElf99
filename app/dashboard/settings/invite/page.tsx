"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { invites, loadInvites, createInvite } from "@/lib/mock-invite"

export default function InvitePage() {
  const [list, setList] = useState(invites)
  useEffect(() => {
    loadInvites()
    setList([...invites])
  }, [])

  const handleGenerate = () => {
    const inv = createInvite(7)
    setList([...invites])
    alert(`${location.origin}/auth/setup?token=${inv.token}`)
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Invite Admin</h1>
      <Button onClick={handleGenerate}>สร้างลิงก์</Button>
      <ul className="list-disc pl-5 text-sm">
        {list.map(i => (
          <li key={i.token}>{i.token} - {new Date(i.expires).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  )
}
