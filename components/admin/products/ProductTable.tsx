import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, Eye } from "lucide-react"
import type { Product } from "@/types/product"
import type { Collection } from "@/types/collection"

interface Props {
  products: Product[]
  collections: Collection[]
  searchTerm: string
  onSearchTermChange: (v: string) => void
  onToggleStatus: (id: string, status: "active" | "draft") => void
  onView: (product: Product) => void
  onDelete: (id: string) => void
}

export default function ProductTable({
  products,
  collections,
  searchTerm,
  onSearchTermChange,
  onToggleStatus,
  onView,
  onDelete,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>รายการสินค้า ({products.length})</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหาสินค้า..."
                value={searchTerm}
                onChange={e => onSearchTermChange(e.target.value)}
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
              <TableHead>คอลเลกชัน</TableHead>
              <TableHead>ราคา</TableHead>
              <TableHead>สต็อก</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>คะแนน</TableHead>
              <TableHead className="text-right">การจัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(product => (
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
                <TableCell>{collections.find(c => c.id === product.collectionId)?.name || "-"}</TableCell>
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
                  <Badge variant={product.inStock ? "default" : "destructive"}>{product.inStock ? "มีสินค้า" : "หมด"}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={product.status === "active" ? "default" : "secondary"}>
                    {product.status === "active" ? "เปิด" : "ร่าง"}
                  </Badge>
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-2"
                    onClick={() => onToggleStatus(product.id, product.status === "active" ? "draft" : "active")}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <span>{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={() => onView(product)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onDelete(product.id)}
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
        {products.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">ไม่พบสินค้าที่ตรงกับเงื่อนไขการค้นหา</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
