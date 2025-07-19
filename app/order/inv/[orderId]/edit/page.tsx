"use client"
import { useState } from "react"
import { getOrders, updateOrder } from "@/core/mock/store"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/inputs/input"

export default function OrderEditPage({ params }: { params: { orderId: string } }) {
  const order = getOrders().find(o => o.id === params.orderId)
  if (!order) return <div className="p-8">ไม่พบออเดอร์</div>
  if (order.status !== "pending") return <div className="p-8">ไม่สามารถแก้ไขได้</div>

  const [name, setName] = useState(order.shippingAddress.name)
  const [phone, setPhone] = useState(order.shippingAddress.phone)
  const [address, setAddress] = useState(order.shippingAddress.address)
  const [city, setCity] = useState(order.shippingAddress.city)
  const [postal, setPostal] = useState(order.shippingAddress.postalCode)

  const save = () => {
    updateOrder(order.id, {
      shippingAddress: { name, phone, address, city, postalCode: postal }
    })
    alert("บันทึกแล้ว")
  }

  return (
    <div className="p-4 space-y-2 max-w-md mx-auto">
      <Input placeholder="ชื่อ" value={name} onChange={e=>setName(e.target.value)} />
      <Input placeholder="เบอร์โทร" value={phone} onChange={e=>setPhone(e.target.value)} />
      <Input placeholder="ที่อยู่" value={address} onChange={e=>setAddress(e.target.value)} />
      <Input placeholder="จังหวัด" value={city} onChange={e=>setCity(e.target.value)} />
      <Input placeholder="รหัสไปรษณีย์" value={postal} onChange={e=>setPostal(e.target.value)} />
      <Button onClick={save}>บันทึก</Button>
    </div>
  )
}
