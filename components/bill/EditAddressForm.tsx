"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

import type { BillStatus } from '@/core/mock/fakeBillDB'

interface Props {
  billId: string
  name: string
  phone: string
  address: string
  status: BillStatus
  delivered?: boolean
}

export default function EditAddressForm({ billId, name: initialName, phone: initialPhone, address: initialAddress, status, delivered }: Props) {
  const [name, setName] = useState(initialName)
  const [phone, setPhone] = useState(initialPhone)
  const [address, setAddress] = useState(initialAddress)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const locked = ['shipped', 'delivered', 'paid'].includes(status)
  if (delivered) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/bill/update-address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ billId, name, phone, address }),
      })
      if (res.ok) {
        toast({ title: "บันทึกข้อมูลแล้ว" })
      } else {
        toast({ title: "บันทึกไม่สำเร็จ", variant: "destructive" })
      }
    } catch {
      toast({ title: "บันทึกไม่สำเร็จ", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm mb-1">ชื่อ</label>
        <input
          className="border p-2 w-full"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={locked}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">โทรศัพท์</label>
        <input
          className="border p-2 w-full"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          disabled={locked}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">ที่อยู่</label>
        <textarea
          className="border p-2 w-full"
          value={address}
          onChange={e => setAddress(e.target.value)}
          disabled={locked}
        />
      </div>
      <button type="submit" className="border px-4 py-1" disabled={loading || locked}>
        {loading ? "กำลังบันทึก" : "บันทึก"}
      </button>
      {locked && (
        <p className="text-sm text-red-600">ไม่สามารถแก้ไขที่อยู่ได้หลังจากจัดส่งแล้ว</p>
      )}
    </form>
  )
}
