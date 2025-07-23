'use client'
import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Input } from '@/components/ui/inputs/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/buttons/button'
import { useToast } from '@/hooks/use-toast'
import { createTicket } from '@/lib/mock-support'

export default function SupportContactPage() {
  const [form, setForm] = useState<{name:string; email:string; question:string; file:File|null}>({name:'', email:'', question:'', file:null})
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    createTicket({ name: form.name, email: form.email, question: form.question })
    setTimeout(() => {
      toast({ title: 'ส่งคำถามเรียบร้อย', description: 'เราจะติดต่อกลับโดยเร็ว' })
      setForm({ name: '', email: '', question: '', file: null })
      setLoading(false)
    }, 500)
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='container mx-auto flex-1 py-8'>
        <h1 className='text-2xl font-bold mb-4'>ติดต่อฝ่ายบริการลูกค้า</h1>
        <form onSubmit={handleSubmit} className='space-y-4 max-w-lg'>
          <div className='space-y-2'>
            <Label htmlFor='name'>ชื่อ</Label>
            <Input id='name' value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>อีเมล</Label>
            <Input id='email' type='email' value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='question'>คำถาม / ปัญหา</Label>
            <Textarea id='question' value={form.question} onChange={e=>setForm({...form,question:e.target.value})} required />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='file'>แนบไฟล์ (mock)</Label>
            <Input id='file' type='file' onChange={e=>setForm({...form,file:e.target.files?.[0]||null})} />
          </div>
          <Button disabled={loading}>{loading ? 'กำลังส่ง...' : 'ส่งข้อความ'}</Button>
        </form>
      </div>
      <Footer />
    </div>
  )
}
