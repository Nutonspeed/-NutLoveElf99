"use client"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/cards/card"
import { Button } from "@/components/ui/buttons/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader as DHeader,
  DialogTitle,
} from "@/components/ui/modals/dialog"
import { Input } from "@/components/ui/inputs/input"
import { Badge } from "@/components/ui/badge"
import type { Fabric } from "@/lib/mock-fabrics"
import { mockFabrics, updateFabric } from "@/lib/mock-fabrics"
import { toast } from "sonner"

export default function AdminFabricsPage() {
  const [fabrics, setFabrics] = useState<Fabric[]>([...mockFabrics])
  const [edit, setEdit] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [tags, setTags] = useState("")

  const startEdit = (f: Fabric) => {
    setEdit(f.id)
    setName(f.name)
    setTags(f.tags?.join(", ") || "")
  }

  const handleSave = () => {
    if (edit) {
      updateFabric(edit, {
        name,
        tags: tags
          .split(/,\s*/)
          .map((t) => t.trim())
          .filter(Boolean),
      })
      setFabrics([...mockFabrics])
      toast.success("บันทึกแล้ว (mock)")
    }
    setEdit(null)
  }

  const editing = edit ? mockFabrics.find((f) => f.id === edit) : null

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">จัดการลายผ้า (mock)</h1>
      <Card>
        <CardHeader>
          <CardTitle>รายการผ้า ({fabrics.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {fabrics.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อ</TableHead>
                  <TableHead>แท็ก</TableHead>
                  <TableHead className="w-24" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {fabrics.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell>{f.name}</TableCell>
                    <TableCell>
                      {f.tags?.length ? (
                        <div className="flex flex-wrap gap-1">
                          {f.tags.map((t) => (
                            <Badge key={t} variant="outline">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => startEdit(f)}
                      >
                        แก้ไข
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center text-muted text-sm">ยังไม่มีผ้าในระบบ</div>
          )}
        </CardContent>
      </Card>
      <Dialog open={!!edit} onOpenChange={() => setEdit(null)}>
        <DialogContent className="max-w-md">
          <DHeader>
            <DialogTitle>แก้ไขลายผ้า</DialogTitle>
          </DHeader>
          {editing ? (
            <div className="space-y-4">
              <Input
                placeholder="ชื่อผ้า"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="แท็กคั่นด้วยคอมม่า"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          ) : (
            <div className="text-center py-4 text-sm">ไม่พบผ้า</div>
          )}
          <DialogFooter>
            <Button onClick={handleSave} disabled={!editing}>
              บันทึก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
