"use client"
import { useState, useEffect } from "react"
import ModalWrapper from "@/components/ui/ModalWrapper"
import { fetchCustomerById, fetchCustomers } from "@/lib/mock-customers"
import type { Customer } from "@/types/customer"

export default function CustomerPopup({ customerId, open, onClose }: { customerId: string; open: boolean; onClose: () => void }) {
  const [customer, setCustomer] = useState<Customer | null>(null)

  useEffect(() => {
    if (!open) return
    async function load() {
      const found = await fetchCustomerById(customerId)
      if (found) return setCustomer(found)
      const all = await fetchCustomers()
      setCustomer(all.find(c => c.name === customerId) || null)
    }
    load()
  }, [customerId, open])

  return (
    <ModalWrapper open={open} onClose={onClose}>
      {customer ? (
        <div className="space-y-1 text-sm">
          <p className="font-medium">{customer.name}</p>
          {customer.email && <p>{customer.email}</p>}
          {customer.phone && <p>{customer.phone}</p>}
        </div>
      ) : (
        <div className="text-sm">ไม่พบข้อมูลลูกค้า</div>
      )}
    </ModalWrapper>
  )
}
