"use client"
import { Button } from "@/components/ui/buttons/button"

export default function AccountingExportPage() {
  const handleDownload = () => {
    window.open('/api/export/accounting', '_blank')
  }
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Accounting Summary</h1>
      <Button onClick={handleDownload}>Download CSV</Button>
    </div>
  )
}
