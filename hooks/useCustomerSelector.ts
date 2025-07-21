"use client"
import { useState, useEffect, useMemo } from 'react'
import type { Customer } from '@/types/customer'
import { CustomerStore } from '@/shared/store/customer'

export function useCustomerSelector(search: string) {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    CustomerStore.getAll().then(list => {
      setCustomers(list)
      setLoading(false)
    })
  }, [])

  const customerList = useMemo(() => {
    const term = search.toLowerCase()
    return customers.filter(c =>
      c.name.toLowerCase().includes(term) || c.phone?.includes(term)
    )
  }, [customers, search])

  return { selectedCustomer, setSelectedCustomer, customerList, loading }
}
