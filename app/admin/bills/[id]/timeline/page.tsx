"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getBillActivity, addBillActivity } from '@/core/mock/store'

export default function BillTimelinePage({ params }: { params: { id: string } }) {
  const { id } = params
  const [activity, setActivity] = useState(() => getBillActivity(id))
  const [action, setAction] = useState('created')
  const [note, setNote] = useState('')

  useEffect(() => {
    setActivity(getBillActivity(id))
  }, [id])

  const handleAdd = () => {
    addBillActivity({ billId: id, action, note })
    setActivity(getBillActivity(id))
    setNote('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4">
          <Link href={`/admin/bills/${id}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Bill Timeline</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activity.length ? (
              <ul className="space-y-1 text-sm">
                {activity.map(a => (
                  <li key={a.id} className="flex space-x-2">
                    <span className="w-32">{new Date(a.timestamp).toLocaleString()}</span>
                    <span className="w-24 capitalize">{a.action}</span>
                    <span className="flex-1">{a.note}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">no activity</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Add Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Select value={action} onValueChange={setAction}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created">created</SelectItem>
                <SelectItem value="paid">paid</SelectItem>
                <SelectItem value="printed">printed</SelectItem>
                <SelectItem value="shipped">shipped</SelectItem>
              </SelectContent>
            </Select>
            <Textarea value={note} onChange={e=>setNote(e.target.value)} />
            <Button onClick={handleAdd}>Add</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
