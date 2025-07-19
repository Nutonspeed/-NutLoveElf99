"use client"
import { useEffect, useState } from "react"
import { companyInfo, loadCompanyInfo } from "@/lib/mock-company"
import { mockOrders } from "@/lib/mock-orders"

export default function TaxInvoice({ params }: { params: { id: string } }) {
  const { id } = params
  const [info, setInfo] = useState(companyInfo)

  useEffect(() => {
    loadCompanyInfo()
    setInfo({ ...companyInfo })
  }, [])

  const order = mockOrders.find(o => o.id === id)
  if (!order) return <div className="p-4">ไม่พบออเดอร์</div>

  return (
    <div className="p-8 space-y-2">
      <h1 className="text-xl font-bold text-center">ใบกำกับภาษี</h1>
      <p>บริษัท: {info.name}</p>
      <p>ที่อยู่: {info.address}</p>
      <p>เลขประจำตัวผู้เสียภาษี: {info.taxId}</p>
      <hr className="my-4" />
      <p>ลูกค้า: {order.customerName}</p>
      <p>Order: {order.id}</p>
      <p>ยอดสุทธิ: ฿{order.total.toLocaleString()}</p>
    </div>
  )
}
