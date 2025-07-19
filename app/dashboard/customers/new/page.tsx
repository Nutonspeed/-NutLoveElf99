"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { Textarea } from "@/components/ui/textarea"
import { addCustomer } from "@/core/mock/customers"
import { toast } from "sonner"

export default function NewCustomerPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [tags, setTags] = useState("")

  const disabled = !name.trim() || !phone.trim() || !email.trim() || !address.trim()

  const handleSave = () => {
    addCustomer({ name, phone, email, address, tags: tags ? tags.split(",") : undefined })
    toast.success("บันทึกลูกค้าแล้ว")
    router.push("/dashboard/customers")
  }

  return (
    <div className="container mx-auto space-y-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold">เพิ่มลูกค้าใหม่</h1>
      <Input placeholder="ชื่อ" value={name} onChange={(e)=>setName(e.target.value)} />
      <Input placeholder="เบอร์โทร" value={phone} onChange={(e)=>setPhone(e.target.value)} />
      <Input placeholder="อีเมล" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <Textarea placeholder="ที่อยู่" value={address} onChange={(e)=>setAddress(e.target.value)} />
      <Input placeholder="แท็ก (คั่นด้วย comma)" value={tags} onChange={(e)=>setTags(e.target.value)} />
      <Button onClick={handleSave} disabled={disabled}>Add Customer</Button>
    </div>
  )
}
