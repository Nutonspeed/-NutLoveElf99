"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/cards/card"
import { Button } from "@/components/ui/buttons/button"
import Image from "next/image"
import cartProducts from "@/mock/cart-products.json"
import { useCart } from "@/contexts/cart-context"

export default function ShopPage() {
  const { dispatch } = useCart()

  const addItem = (p: (typeof cartProducts)[number]) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { id: p.id, name: p.title, price: p.price, image: p.image, quantity: 1 },
    })
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">เลือกสินค้าเพิ่มเติม</h1>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {cartProducts.map((p) => (
            <Card key={p.id} className="flex flex-col items-center p-4 text-center space-y-3">
              <div className="relative w-24 h-24">
                <Image src={p.image || "/placeholder.svg"} alt={p.title} fill className="object-cover rounded" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-sm">{p.title}</h3>
                <p className="font-bold text-primary">฿{p.price.toLocaleString()}</p>
              </div>
              <Button size="sm" onClick={() => addItem(p)} className="mt-auto">
                เพิ่มลงตะกร้า
              </Button>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
