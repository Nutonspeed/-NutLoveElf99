"use client"
import { useEffect } from "react"
import CartPage from "@/app/cart/page"
import { useCart } from "@/contexts/cart-context"
import { mockOrders } from "@/lib/mock-orders"
import { mockProducts } from "@/lib/mock-products"

export default function ReorderPage({ params }: { params: { orderId: string } }) {
  const { dispatch } = useCart()
  useEffect(() => {
    const order = mockOrders.find((o) => o.id === params.orderId)
    if (!order) return
    if (typeof window !== "undefined") {
      const key = "reordered-" + params.orderId
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, "1")
    }
    for (const item of order.items) {
      const product = mockProducts.find((p) => p.id === item.productId)
      if (!product || !product.inStock || product.status === "draft") continue
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: item.productId,
          name: item.productName,
          price: item.price,
          image: "/placeholder.svg",
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        },
      })
    }
  }, [dispatch, params.orderId])
  return <CartPage />
}
