'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { tickets, loadTickets, addReply, closeTicket, type SupportTicket } from '@/lib/mock-support'
import { Button } from '@/components/ui/buttons/button'
import { Textarea } from '@/components/ui/textarea'

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const [ticket, setTicket] = useState<SupportTicket | null>(null)
  const [reply, setReply] = useState('')

  useEffect(() => {
    loadTickets()
    const t = tickets.find(t => t.id === params.id)
    if (t) setTicket({ ...t })
  }, [params.id])

  const handleReply = () => {
    if (!ticket || !reply) return
    addReply(ticket.id, reply, 'staff')
    setTicket({ ...ticket, messages: [...ticket.messages, { from: 'staff', text: reply, date: new Date().toISOString() }], status: 'ตอบแล้ว' })
    setReply('')
  }

  const handleClose = () => {
    if (!ticket) return
    closeTicket(ticket.id)
    setTicket({ ...ticket, status: 'ปิดแล้ว' })
  }

  if (!ticket) return <div className='container mx-auto py-8'>ไม่พบ Ticket</div>

  return (
    <div className='container mx-auto py-8 space-y-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Ticket {ticket.id}</h1>
        {ticket.status !== 'ปิดแล้ว' && <Button variant='outline' onClick={handleClose}>ปิดเรื่อง</Button>}
      </div>
      <div className='grid md:grid-cols-3 gap-6'>
        <div className='md:col-span-2 space-y-4'>
          {ticket.messages.map((m, idx) => (
            <div key={idx} className={`p-3 rounded border ${m.from==='staff' ? 'bg-gray-50' : 'bg-blue-50'}`}>{m.text}</div>
          ))}
          {ticket.status !== 'ปิดแล้ว' && (
            <div className='space-y-2'>
              <Textarea value={reply} onChange={e=>setReply(e.target.value)} />
              <Button onClick={handleReply} disabled={!reply}>ตอบกลับ</Button>
            </div>
          )}
        </div>
        <div className='border rounded p-4 space-y-2'>
          <h2 className='font-semibold'>ข้อมูลลูกค้า</h2>
          <p>{ticket.name}</p>
          <p>{ticket.email}</p>
          <p>สถานะ: {ticket.status}</p>
          <p>สร้างเมื่อ: {new Date(ticket.createdAt).toLocaleString('th-TH')}</p>
        </div>
      </div>
    </div>
  )
}
