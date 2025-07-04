"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search, Edit, Trash2, ArrowLeft, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { mockProducts, type Product } from "@/lib/mock-data"

export default function AdminProductsPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    if (user?.role !== "admin") {
      router.push("/")
      return
    }
  }, [isAuthenticated, user, router])

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

  if (user?.role !== "admin") {
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
    setProducts(products.filter((p) => p.id !== productId))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">จัดการสินค้า</h1>
              <p className="text-gray-600">เพิ่ม แก้ไข และจัดการสินค้าทั้งหมด</p>
            </div>
          </div>

          <Button>
            <Plus className="mr-2 h-4 w-4" />
            เพิ่มสินค้าใหม่
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>รายการสินค้า ({filteredProducts.length})</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหาสินค้า..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>รูปภาพ</TableHead>
                  <TableHead>ชื่อสินค้า</TableHead>
                  <TableHead>หมวดหมู่</TableHead>
                  <TableHead>ราคา</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>คะแนน</TableHead>
                  <TableHead className="text-right">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-lg object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold">฿{product.price.toLocaleString()}</p>
                        {product.originalPrice && (
                          <p className="text-sm text-gray-500 line-through">
                            ฿{product.originalPrice.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.inStock ? "default" : "destructive"}>
                        {product.inStock ? "มีสินค้า" : "หมด"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span>{product.rating}</span>
                        <span className="text-sm text-gray-500">({product.reviews})</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => setSelectedProduct(product)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>รายละเอียดสินค้า</DialogTitle>
                            </DialogHeader>
                            {selectedProduct && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <Image
                                    src={selectedProduct.images[0] || "/placeholder.svg"}
                                    alt={selectedProduct.name}
                                    width={300}
                                    height={300}
                                    className="rounded-lg object-cover"
                                  />
                                  <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">{selectedProduct.name}</h3>
                                    <p className="text-gray-600">{selectedProduct.description}</p>
                                    <div className="space-y-1">
                                      <p>
                                        <strong>หมวดหมู่:</strong> {selectedProduct.category}
                                      </p>
                                      <p>
                                        <strong>วัสดุ:</strong> {selectedProduct.material}
                                      </p>
                                      <p>
                                        <strong>ขนาด:</strong> {selectedProduct.sizes.join(", ")}
                                      </p>
                                      <p>
                                        <strong>สี:</strong> {selectedProduct.colors.join(", ")}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">คุณสมบัติ:</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedProduct.features.map((feature, index) => (
                                      <Badge key={index} variant="secondary">
                                        {feature}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">ไม่พบสินค้าที่ตรงกับเงื่อนไขการค้นหา</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
