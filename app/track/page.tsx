"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'

export default function TrackSearchPage() {
  const [id,setId] = useState('')
  const router = useRouter()
  const submit = (e:any)=>{e.preventDefault(); if(id.trim()) router.push(`/track/${id.trim()}`)}
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <form onSubmit={submit} className="container mx-auto px-4 py-20 max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold">ตรวจสอบสถานะพัสดุ</h1>
        <Input value={id} onChange={e=>setId(e.target.value)} placeholder="Tracking ID" />
        <Button type="submit" className="w-full">ตรวจสอบ</Button>
      </form>
      <Footer />
    </div>
  )
}
