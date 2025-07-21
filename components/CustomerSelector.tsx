"use client"
import { useState } from 'react'
import { Input } from '@/components/ui/inputs/input'
import { useCustomerSelector } from '@/hooks/useCustomerSelector'
import type { Customer } from '@/types/customer'

export default function CustomerSelector({ onSelect }: { onSelect: (c: Customer | null) => void }) {
  const [search, setSearch] = useState('')
  const { selectedCustomer, setSelectedCustomer, customerList, loading } = useCustomerSelector(search)

  const choose = (c: Customer) => {
    setSelectedCustomer(c)
    onSelect(c)
  }

  const highlight = (text: string) => {
    if (!search) return text
    return text.replace(new RegExp(`(${search})`, 'gi'), '<mark>$1</mark>')
  }

  return (
    <div className='space-y-2'>
      <Input placeholder='ค้นหาลูกค้า...' value={search} onChange={e => setSearch(e.target.value)} />
      <div className='border rounded max-h-40 overflow-y-auto'>
        {loading && <div className='p-2 text-sm'>Loading...</div>}
        {customerList.map(c => (
          <div key={c.id} className='p-2 cursor-pointer hover:bg-gray-100' onClick={() => choose(c)}>
            <span dangerouslySetInnerHTML={{ __html: highlight(c.name) }} />
            {c.phone && <span className='text-sm text-gray-500'> ({highlight(c.phone)})</span>}
          </div>
        ))}
      </div>
      {selectedCustomer && (
        <div className='text-sm space-y-1'>
          <p className='font-medium'>{selectedCustomer.name}</p>
          {selectedCustomer.phone && <p>{selectedCustomer.phone}</p>}
          {selectedCustomer.email && <p>{selectedCustomer.email}</p>}
        </div>
      )}
    </div>
  )
}
