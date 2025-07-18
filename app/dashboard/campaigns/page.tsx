"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { campaigns, loadCampaigns, addCampaign, removeCampaign } from "@/lib/mock-campaign-conditions"

export default function CampaignPage() {
  const [list, setList] = useState(campaigns)
  const [name, setName] = useState("")
  const [type, setType] = useState<'banner' | 'flash-sale'>('banner')
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")

  useEffect(() => {
    loadCampaigns()
    setList([...campaigns])
  }, [])

  const handleAdd = () => {
    addCampaign({ id: Date.now().toString(), name, type, start, end })
    setList([...campaigns])
    setName("")
    setStart("")
    setEnd("")
  }

  const handleRemove = (id: string) => {
    removeCampaign(id)
    setList([...campaigns])
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Campaigns (mock)</h1>
      <div className="grid gap-2 sm:grid-cols-5 max-w-3xl">
        <Input placeholder="ชื่อ" value={name} onChange={e=>setName(e.target.value)} />
        <select className="rounded border p-2" value={type} onChange={e=>setType(e.target.value as any)}>
          <option value="banner">เปิด banner</option>
          <option value="flash-sale">เปิด flash sale</option>
        </select>
        <Input type="date" value={start} onChange={e=>setStart(e.target.value)} />
        <Input type="date" value={end} onChange={e=>setEnd(e.target.value)} />
        <Button onClick={handleAdd}>สร้าง</Button>
      </div>
      {list.length > 0 ? (
        <ul className="space-y-2">
          {list.map(c => (
            <li key={c.id} className="flex items-center justify-between rounded border p-2">
              <div>
                <p className="font-medium">{c.name} - {c.type}</p>
                <p className="text-sm text-muted-foreground">{c.start || '-'} ถึง {c.end || '-'}</p>
              </div>
              <Button size="sm" variant="outline" onClick={()=>handleRemove(c.id)}>ลบ</Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-muted-foreground">ยังไม่มีแคมเปญ</p>
      )}
    </div>
  )
}
