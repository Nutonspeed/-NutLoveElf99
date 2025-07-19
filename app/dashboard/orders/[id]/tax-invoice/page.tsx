"use client"
import { downloadPDF } from "@/lib/mock-export"

export default function OrderTaxInvoice({ params }: { params: { id: string } }) {
  const { id } = params
  const handleDownload = () => {
    downloadPDF('mock tax invoice pdf', `tax-invoice-${id}.pdf`)
  }
  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Tax Invoice {id}</h1>
      <iframe src={`/tax-invoice/${id}`} className="w-full h-[600px] border" />
      <button onClick={handleDownload} className="border rounded px-4 py-2">
        Download PDF
      </button>
    </div>
  )
}
