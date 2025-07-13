"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { mockCustomers } from "@/lib/mock-customers"

export default function CustomersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-bold">ลูกค้าของเรา</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCustomers.map((c) => (
            <div key={c.id} className="border p-4 rounded">
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-gray-500">{c.email}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
