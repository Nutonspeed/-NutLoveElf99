"use client"
import { downloadCSV } from '@/lib/mock-export'
import { getCustomers } from '@/core/mock/store'
import { getCustomerStats } from '@/lib/mock-customers'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/buttons/button'
import { addImportExportLog } from '@/lib/mock-import-log'

export default function ExportCustomersPage() {
  const [rows, setRows] = useState<any[]>([])
  useEffect(() => {
    const customers = getCustomers()
    const data = customers.map(c => ({
      name: c.name,
      phone: c.phone || '',
      email: c.email,
      lastOrder: getCustomerStats(c.id).lastOrderDate || ''
    }))
    setRows(data)
  }, [])

  const handleDownload = () => {
    downloadCSV(rows, 'customers.csv')
    addImportExportLog('customers.csv', rows.length)
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Export Customers</h1>
      <Button onClick={handleDownload} disabled={rows.length === 0}>Download CSV</Button>
    </div>
  )
}
