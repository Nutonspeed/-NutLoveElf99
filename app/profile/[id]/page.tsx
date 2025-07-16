"use client"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { mockCustomers } from "@/lib/mock-customers"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"

export default function CustomerProfilePage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const customer = mockCustomers.find((c) => c.id === id)

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>ไม่พบลูกค้า</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-bold">{customer.name}</h1>
        <p className="text-gray-600">{customer.email}</p>
        {customer.phone && <p>{customer.phone}</p>}
        {customer.address && <p>{customer.address}</p>}
        <div>
          <h2 className="font-semibold mb-1">หมายเหตุจากลูกค้า</h2>
          <p className="text-sm text-gray-700">
            {customer.note || "ไม่มีหมายเหตุ"}
          </p>
        </div>
        <Link href="/profile">
          <Button variant="outline">กลับ</Button>
        </Link>
      </div>
      <Footer />
    </div>
  )
}
