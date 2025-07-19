'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { tickets, loadTickets, type SupportTicket } from '@/lib/mock-support'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/buttons/button'
import EmptyState from '@/components/EmptyState'

export default function SupportInboxPage() {
  const [status, setStatus] = useState('ทั้งหมด')
  const [list, setList] = useState<SupportTicket[]>([])

  useEffect(() => {
    loadTickets()
    setList([...tickets])
  }, [])

  const filtered = list.filter(t => status === 'ทั้งหมด' || t.status === status)

  return (
    <div className='container mx-auto py-8 space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>กล่องข้อความ</h1>
        <select value={status} onChange={e=>setStatus(e.target.value)} className='border rounded p-2'>
          <option value='ทั้งหมด'>ทั้งหมด</option>
          <option value='ใหม่'>ใหม่</option>
          <option value='ตอบแล้ว'>ตอบแล้ว</option>
          <option value='ปิดแล้ว'>ปิดแล้ว</option>
        </select>
      </div>
      {filtered.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>รหัส</TableHead>
              <TableHead>ผู้ติดต่อ</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead className='text-right'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(t => (
              <TableRow key={t.id}>
                <TableCell>{t.id}</TableCell>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.status}</TableCell>
                <TableCell className='text-right'>
                  <Link href={`/dashboard/support/${t.id}`}><Button variant='outline' size='sm'>ตอบ</Button></Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <EmptyState title='ไม่มีคำถาม' />
      )}
    </div>
  )
}
