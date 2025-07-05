"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

interface Item { name: string; price: number; quantity: number }
interface Order {
  id: string
  customer_name: string
  customer_contact: string
  items: Item[]
  subtotal: number
  discount: number
  deposit: number
  total: number
  note: string
}

export default function BillPage() {
  const params = useParams()
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await supabase.from('orders').select('*').eq('id', params.id as string).single()
      if (data) setOrder(data as Order)
    }
    fetchOrder()
  }, [params.id])

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">กำลังโหลด...</div>
    )
  }

  return (
    <div className="container mx-auto max-w-2xl py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>บิลเลขที่ {order.id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>ชื่อลูกค้า: {order.customer_name}</div>
          <div>เบอร์โทร: {order.customer_contact}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>รายการสินค้า</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {order.items.map((it, idx) => (
            <div key={idx} className="flex justify-between border-b py-2 last:border-b-0">
              <div>
                <p>{it.name}</p>
                <p className="text-sm text-gray-600">จำนวน {it.quantity}</p>
              </div>
              <div className="font-medium">฿{(it.price * it.quantity).toLocaleString()}</div>
            </div>
          ))}
          <div className="flex justify-between pt-2 border-t font-medium">
            <span>ยอดรวมสินค้า</span>
            <span>฿{order.subtotal.toLocaleString()}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>ส่วนลด</span>
              <span>-฿{order.discount.toLocaleString()}</span>
            </div>
          )}
          {order.deposit > 0 && (
            <div className="flex justify-between text-blue-600">
              <span>มัดจำ</span>
              <span>-฿{order.deposit.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t font-bold text-lg">
            <span>ยอดสุทธิ</span>
            <span>฿{order.total.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {order.note && (
        <Card>
          <CardHeader>
            <CardTitle>หมายเหตุ</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{order.note}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
