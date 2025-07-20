"use client"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { Textarea } from "@/components/ui/textarea"
import { mockCustomers, updateCustomer, removeCustomer } from "@/core/mock/customers"
import { toast } from "sonner"

export default function CustomerDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const customer = mockCustomers.find(c => c.id === params.id)

  const [name, setName] = useState(customer?.name || "")
  const [phone, setPhone] = useState(customer?.phone || "")
  const [tags, setTags] = useState(customer?.tags?.join(",") || "")
  const [address, setAddress] = useState(customer?.address || "")

  if (!customer) return <div className="p-8">ไม่พบลูกค้า</div>

  const handleSave = () => {
    updateCustomer(customer.id, { name, phone, address, tags: tags ? tags.split(",") : [] })
    toast.success("บันทึกแล้ว")
  }

  const handleDelete = () => {
    if (confirm("ลบลูกค้านี้หรือไม่")) {
      removeCustomer(customer.id)
      toast.success("ลบแล้ว")
      router.push("/dashboard/customers")
    }
  }

  return (
    <div className="container mx-auto space-y-4 py-8 max-w-md">
      <Link href="/dashboard/customers">
        <Button variant="outline">กลับ</Button>
      </Link>
      <Input value={name} onChange={(e)=>setName(e.target.value)} />
      <Input value={phone} onChange={(e)=>setPhone(e.target.value)} />
      <Textarea value={address} onChange={(e)=>setAddress(e.target.value)} />
      <Input placeholder="แท็ก" value={tags} onChange={(e)=>setTags(e.target.value)} />
      <div className="flex gap-2">
        <Button onClick={handleSave}>Save</Button>
        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  )
}
