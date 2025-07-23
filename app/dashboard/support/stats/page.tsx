'use client'
import { useEffect, useState } from 'react'
import { tickets, loadTickets, averageReplyHours, type SupportTicket } from '@/lib/mock-support'
import { PieChart, Pie, Cell } from 'recharts'

export default function SupportStatsPage() {
  const [list, setList] = useState<SupportTicket[]>([])

  useEffect(() => {
    loadTickets()
    setList([...tickets])
  }, [])

  const total = list.length
  const closed = list.filter(t => t.status === 'ปิดแล้ว').length
  const answered = list.filter(t => t.status === 'ตอบแล้ว').length
  const newCount = list.filter(t => t.status === 'ใหม่').length
  const avg = averageReplyHours()

  const data = [
    { name: 'ใหม่', value: newCount },
    { name: 'ตอบแล้ว', value: answered },
    { name: 'ปิดแล้ว', value: closed },
  ]
  const colors = ['#8884d8', '#82ca9d', '#ffc658']

  return (
    <div className='container mx-auto py-8 space-y-6'>
      <h1 className='text-2xl font-bold'>สถิติการซัพพอร์ต</h1>
      <div className='grid md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <p>จำนวน Ticket ทั้งหมด: {total}</p>
          <p>เวลาตอบเฉลี่ย: {avg.toFixed(2)} ชั่วโมง</p>
        </div>
        <PieChart width={300} height={300}>
          <Pie data={data} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={80}>
            {data.map((entry, index) => (
              <Cell key={`c-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  )
}
