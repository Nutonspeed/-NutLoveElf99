import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Search, Edit, Trash2 } from "lucide-react"
import type { Collection } from "@/types/collection"

interface CollectionWithFabrics extends Collection {
  fabrics: { id: string; name: string }[]
}

interface Props {
  collections: CollectionWithFabrics[]
  searchTerm: string
  onSearchTermChange: (v: string) => void
  onEdit: (collection: CollectionWithFabrics) => void
  onDelete: (id: string) => void
}

export default function CollectionsTable({ collections, searchTerm, onSearchTermChange, onEdit, onDelete }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>รายการคอลเลกชัน ({collections.length})</CardTitle>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ค้นหา..."
              value={searchTerm}
              onChange={e => onSearchTermChange(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>รูปปก</TableHead>
              <TableHead>ชื่อ</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>คำอธิบาย</TableHead>
              <TableHead>ลายผ้า</TableHead>
              <TableHead className="text-right">การจัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collections.map(collection => (
              <TableRow key={collection.id}>
                <TableCell>
                  <Image
                    src={collection.images[0] || "/placeholder.svg"}
                    alt={collection.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell>{collection.name}</TableCell>
                <TableCell>{collection.slug}</TableCell>
                <TableCell className="line-clamp-2 max-w-xs">{collection.description}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {collection.fabrics.map(f => f.name).join(', ') || '-'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={() => onEdit(collection)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onDelete(collection.id)}
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
        {collections.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">ไม่พบคอลเลกชันที่ตรงกับเงื่อนไขการค้นหา</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
