"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/cards/card"
import { Checkbox } from "@/components/ui/checkbox"
import { mockOrders, splitOrder } from "@/lib/mock-orders"
import { useToast } from "@/hooks/use-toast"

export default function SplitOrderPage({ params }: { params: { id: string } }) {
  const { id } = params
  const order = mockOrders.find((o) => o.id === id)
  const router = useRouter()
  const { toast } = useToast()
  const [selected, setSelected] = useState<number[]>([])

  if (!order) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบคำสั่งซื้อ</h1>
          <Link href="/orders">
            <Button>กลับไปหน้าคำสั่งซื้อ</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const toggle = (index: number) => {
    setSelected((cur) =>
      cur.includes(index) ? cur.filter((i) => i !== index) : [...cur, index],
    )
  }

  const handleSplit = () => {
    const newOrder = splitOrder(order.id, selected)
    if (newOrder) {
      toast({ title: "แยกคำสั่งซื้อสำเร็จ" })
      router.push(`/orders/${newOrder.id}`)
    } else {
      toast({ title: "ไม่สามารถแยกได้", variant: "destructive" })
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold">แยกคำสั่งซื้อ {order.id}</h1>
        <Card>
          <CardHeader>
            <CardTitle>เลือกสินค้าที่ต้องการแยก</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  checked={selected.includes(index)}
                  onCheckedChange={() => toggle(index)}
                />
                <span>
                  {item.productName} x {item.quantity}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="flex space-x-2">
          <Button onClick={handleSplit} disabled={selected.length === 0}>
            ยืนยันการแยก
          </Button>
          <Link href={`/orders/${order.id}`}>
            <Button variant="outline">ยกเลิก</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
