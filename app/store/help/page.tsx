'use client'
import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface Faq {
  id: string
  question: string
  answer: string
  category: string
}

const items: Faq[] = [
  { id: '1', question: 'สั่งซื้อสินค้าอย่างไร?', answer: 'เลือกสินค้าที่ต้องการแล้วกดสั่งซื้อ', category: 'การสั่งซื้อ' },
  { id: '2', question: 'มีบริการจัดส่งฟรีหรือไม่?', answer: 'จัดส่งฟรีเมื่อสั่งครบ 1,500 บาท', category: 'การจัดส่ง' },
  { id: '3', question: 'คืนสินค้าได้ภายในกี่วัน?', answer: 'สามารถคืนได้ภายใน 30 วัน', category: 'การคืนสินค้า' },
  { id: '4', question: 'ติดต่อร้านได้ทางไหนบ้าง?', answer: 'ติดต่อได้ทางอีเมลและโทรศัพท์', category: 'ทั่วไป' },
]

const categories = ['ทั้งหมด', 'ทั่วไป', 'การสั่งซื้อ', 'การจัดส่ง', 'การคืนสินค้า']

export default function HelpCenterPage() {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('ทั้งหมด')

  const filtered = items.filter((i) =>
    (category === 'ทั้งหมด' || i.category === category) &&
    (i.question.includes(keyword) || i.answer.includes(keyword))
  )

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='container mx-auto flex-1 py-8 space-y-4'>
        <h1 className='text-3xl font-bold text-center'>ศูนย์ช่วยเหลือ</h1>
        <div className='flex gap-2 justify-center'>
          <select value={category} onChange={(e)=>setCategory(e.target.value)} className='border rounded p-2'>
            {categories.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
          <input value={keyword} onChange={(e)=>setKeyword(e.target.value)} placeholder='ค้นหา...' className='border rounded p-2 flex-1 max-w-xs' />
        </div>
        <Accordion type='single' collapsible className='max-w-2xl mx-auto'>
          {filtered.map(f => (
            <AccordionItem key={f.id} value={f.id}>
              <AccordionTrigger>{f.question}</AccordionTrigger>
              <AccordionContent>{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <Footer />
    </div>
  )
}
