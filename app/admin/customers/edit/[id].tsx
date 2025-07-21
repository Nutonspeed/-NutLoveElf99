"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import CustomerForm, { CustomerFormValues } from '@/components/admin/customers/CustomerForm'
import { CustomerStore, loadMockCustomers } from '@/core/store/customer'
import { mockCustomers } from '@/lib/mock-customers'
import type { CustomerSchema } from '@/lib/schema/customer'
import { Button } from '@/components/ui/buttons/button'

export default function EditCustomerPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const [customer, setCustomer] = useState<CustomerSchema | undefined>()

  useEffect(() => {
    loadMockCustomers(mockCustomers as unknown as CustomerSchema[])
    if (id !== 'new') {
      setCustomer(CustomerStore.getById(id))
    }
  }, [id])

  const handleSubmit = (values: CustomerFormValues & { tags: string[] }) => {
    if (id === 'new') {
      CustomerStore.create(values as Omit<CustomerSchema, 'id' | 'createdAt'>)
    } else {
      CustomerStore.update(id, values)
    }
    router.push('/admin/customers')
  }

  if (id !== 'new' && !customer) {
    return <div className="p-4">ไม่พบข้อมูลลูกค้า</div>
  }

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/admin/customers">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold">{id === 'new' ? 'สร้างลูกค้า' : 'แก้ไขลูกค้า'}</h1>
      </div>
      <div className="max-w-md">
        <CustomerForm
          defaultValues={{
            name: customer?.name,
            phone: customer?.phone,
            tags: customer?.tags?.join(', '),
            note: customer?.note,
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
