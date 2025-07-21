"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import CustomerForm, { CustomerFormData } from "@/components/admin/customers/CustomerForm"
import { useCustomerStore } from "@/core/store"

export default function CreateCustomerPage() {
  const router = useRouter()
  const create = useCustomerStore(s => s.create)
  const customers = useCustomerStore(s => s.customers)
  const [loading, setLoading] = useState(false)

  const handleSave = (data: CustomerFormData) => {
    if (customers.some(c => c.phone === data.phone)) {
      toast.error("เบอร์โทรนี้มีอยู่แล้ว")
      return
    }
    setLoading(true)
    create(data)
    toast.success("เพิ่มลูกค้าแล้ว")
    router.push("/admin/customers")
  }

  return (
    <div className="container mx-auto max-w-md py-8">
      <h1 className="text-2xl font-bold mb-4">เพิ่มลูกค้าใหม่</h1>
      <CustomerForm onSubmit={handleSave} loading={loading} />
    </div>
  )
}
