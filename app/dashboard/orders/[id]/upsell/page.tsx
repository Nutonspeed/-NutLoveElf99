"use client"
import { useParams, useRouter } from "next/navigation"
import { mockOrders } from "@/core/mock/orders"
import { Button } from "@/components/ui/buttons/button"
import { toast } from "sonner"

const rules: Record<string, string> = {
  "ผ้าคลุมโซฟา": "สเปรย์กันฝุ่น",
  Cotton: "น้ำยาซักผ้าอ่อนโยน",
}

export default function OrderUpsellPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const order = mockOrders.find(o => o.id === params.id)
  if (!order) return <p className="p-4">ไม่พบออเดอร์</p>
  const items = order.items.map(i => i.productName).join(", ")
  const suggestions = Object.entries(rules)
    .filter(([k]) => items.includes(k))
    .map(([_, v]) => v)
  const add = (item: string) => {
    order.items.push({
      productId: Date.now().toString(),
      productName: item,
      quantity: 1,
      price: 100,
    })
    order.total += 100
    toast.success(`เพิ่ม ${item} แล้ว`)
    router.back()
  }
  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">เสนอขายเพิ่ม</h1>
      <p className="text-sm">ออเดอร์ {order.id}: {items}</p>
      {suggestions.length ? (
        <div className="space-y-2">
          {suggestions.map(s => (
            <div key={s} className="flex items-center justify-between rounded border p-4">
              <span>{s}</span>
              <Button size="sm" onClick={() => add(s)}>เพิ่ม</Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">ไม่มีสินค้าแนะนำ</p>
      )}
    </div>
  )
}
