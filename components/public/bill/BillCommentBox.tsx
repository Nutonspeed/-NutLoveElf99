'use client'
import { useState } from 'react'
import type { BillComment } from '@/core/fake/types'

export default function BillCommentBox({
  billId,
  initialComments,
}: {
  billId: string
  initialComments: BillComment[]
}) {
  const [comments, setComments] = useState(initialComments)
  const [message, setMessage] = useState('')

  const send = async () => {
    if (!message.trim()) return
    const res = await fetch(`/api/bill/${billId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
    if (res.ok) {
      const c: BillComment = await res.json()
      setComments([...comments, c])
      setMessage('')
    }
  }

  return (
    <div className="space-y-2">
      <ul className="space-y-1 text-sm">
        {comments.map(c => (
          <li key={c.id}>
            <span className="text-gray-600">{new Date(c.timestamp).toLocaleString()}:</span>{' '}
            {c.message}
          </li>
        ))}
      </ul>
      <div className="flex space-x-2">
        <input
          className="flex-1 border p-2 text-sm"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="คำถามของคุณ"
        />
        <button onClick={send} className="border px-3 py-1">
          Send
        </button>
      </div>
    </div>
  )
}
