"use client"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { mockProducts } from "@/lib/mock-products"

export default function StoreProductDetail({ params }: { params: { id: string } }) {
  const product = mockProducts.find((p) => p.id === params.id)
  const { dispatch } = useCart()
  const { toast } = useToast()
  const [size, setSize] = useState("")
  const [color, setColor] = useState("")
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>ไม่พบสินค้า</p>
      </div>
    )
  }

  const addToCart = () => {
    if (!size || !color) {
      toast({ title: "กรุณาเลือกตัวเลือก", variant: "destructive" })
      return
    }
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: `${product.id}-${size}-${color}`,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: qty,
        size,
        color,
      },
    })
    toast({ title: "เพิ่มลงตะกร้าแล้ว" })
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative w-full h-96">
            <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover rounded-lg" />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-lg font-bold text-primary">฿{product.price.toLocaleString()}</p>
          <div className="flex space-x-4">
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="ขนาด" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes?.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="สี" />
              </SelectTrigger>
              <SelectContent>
                {product.colors?.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => setQty(Math.max(1, qty - 1))}>-</Button>
            <span>{qty}</span>
            <Button variant="outline" size="icon" onClick={() => setQty(qty + 1)}>+</Button>
          </div>
          <Button className="mt-4" onClick={addToCart}>เพิ่มลงตะกร้า</Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
