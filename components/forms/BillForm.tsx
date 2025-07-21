"use client"
import { useState } from 'react'
import { Input } from '@/components/ui/inputs/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/buttons/button'

export interface BillFormValues {
  customer: string
  items: string
  amount: number
  status: 'draft' | 'paid' | 'overdue'
}

export default function BillForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: BillFormValues) => void
  defaultValues?: Partial<BillFormValues>
}) {
  const [customer, setCustomer] = useState(defaultValues?.customer ?? '')
  const [items, setItems] = useState(defaultValues?.items ?? '')
  const [amount, setAmount] = useState<number>(
    defaultValues?.amount ?? 0,
  )
  const [status, setStatus] = useState<BillFormValues['status']>(
    defaultValues?.status ?? 'draft',
  )

  const disabled = !customer.trim() || !items.trim() || amount <= 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (disabled) return
    onSubmit({ customer: customer.trim(), items, amount, status })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="ชื่อลูกค้า"
        value={customer}
        onChange={e => setCustomer(e.target.value)}
      />
      <Textarea
        placeholder="รายการสินค้า"
        value={items}
        onChange={e => setItems(e.target.value)}
      />
      <Input
        type="number"
        placeholder="ยอดรวม"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
      />
      <select
        className="border rounded-md px-2 py-1 w-full"
        value={status}
        onChange={e => setStatus(e.target.value as BillFormValues['status'])}
      >
        <option value="draft">draft</option>
        <option value="paid">paid</option>
        <option value="overdue">overdue</option>
      </select>
      <Button type="submit" disabled={disabled} className="w-full">
        Save Bill
      </Button>
    </form>
  )
}
