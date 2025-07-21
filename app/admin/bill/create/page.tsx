"use client"
import Link from 'next/link'
import PageWrapper from '@/components/admin/PageWrapper'
import BillForm, { BillFormValues } from '@/components/forms/BillForm'
import { useBillStore } from '@/stores/billStore'
import { genBillId } from '@/lib/genBillId'

export default function AdminBillCreateSimple() {
  const addBill = useBillStore(s => s.addBill)

  const handleSubmit = (data: BillFormValues) => {
    addBill({ id: genBillId(), ...data })
  }

  return (
    <PageWrapper
      title="สร้างบิลใหม่"
      breadcrumb={[
        { title: 'แดชบอร์ด', href: '/admin' },
        { title: 'บิล', href: '/admin/bills' },
        { title: 'สร้างใหม่' },
      ]}
    >
      <div className="max-w-md space-y-4">
        <BillForm onSubmit={handleSubmit} />
        <Link href="/admin/bills" className="text-sm text-primary underline">
          กลับไปหน้าบิล
        </Link>
      </div>
    </PageWrapper>
  )
}
