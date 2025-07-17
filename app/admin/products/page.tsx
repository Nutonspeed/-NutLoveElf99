"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/buttons/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ArrowLeft } from "lucide-react"
import { canAccess } from "@/lib/mock-roles"
import Link from "next/link"
import { type Product } from "@/types/product"
import { useAdminProducts } from "@/contexts/admin-products-context"
import { useAdminCollections } from "@/contexts/admin-collections-context"
import ProductTable from "@/components/admin/products/ProductTable"
import ProductDetailDialog from "@/components/admin/products/ProductDetailDialog"

export default function AdminProductsPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { products, deleteProduct, updateProduct } = useAdminProducts()
  const { collections } = useAdminCollections()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">กรุณาเข้าสู่ระบบ</h1>
          <Link href="/login">
            <Button>เข้าสู่ระบบ</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!canAccess(user?.role, 'inventory')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่มีสิทธิ์เข้าถึง</h1>
          <Link href="/">
            <Button>กลับหน้าแรก</Button>
          </Link>
        </div>
      </div>
    )
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteProduct = (productId: string) => {
    deleteProduct(productId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">จัดการสินค้า</h1>
              <p className="text-gray-600">เพิ่ม แก้ไข และจัดการสินค้าทั้งหมด</p>
            </div>
          </div>

          <Link href="/admin/products/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              เพิ่มสินค้าใหม่
            </Button>
          </Link>
        </div>

        <ProductTable
          products={filteredProducts}
          collections={collections}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onToggleStatus={(id, status) => updateProduct(id, { status })}
          onView={setSelectedProduct}
          onDelete={handleDeleteProduct}
        />
        <ProductDetailDialog
          product={selectedProduct}
          collections={collections}
          open={!!selectedProduct}
          onOpenChange={() => setSelectedProduct(null)}
        />
      </div>
    </div>
  )
}
