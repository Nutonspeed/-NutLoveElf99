"use client"

import { useEffect, useState } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader as DHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/modals/dialog"
import { Button } from "@/components/ui/buttons/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { useToast } from "@/hooks/use-toast"
import type { AdminFabric } from "@/mock/fabrics"
import { mockFabrics, addFabric, updateFabric, deleteFabric } from "@/mock/fabrics"

export default function AdminFabricsPage() {
  const [fabrics, setFabrics] = useState<AdminFabric[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      setFabrics([...mockFabrics])
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const [openAdd, setOpenAdd] = useState(false)
  const [addName, setAddName] = useState("")
  const [addPrice, setAddPrice] = useState("")
  const [addFiles, setAddFiles] = useState<File[]>([])
  const [saving, setSaving] = useState(false)

  const addPreviews = addFiles.map(f => URL.createObjectURL(f))

  const handleAdd = () => {
    setSaving(true)
    const imgs = addPreviews.slice()
    addFabric({ name: addName, price: Number(addPrice || 0), images: imgs })
    setFabrics([...mockFabrics])
    setOpenAdd(false)
    setAddName("")
    setAddPrice("")
    setAddFiles([])
    setSaving(false)
    toast({ title: "เพิ่มลายผ้าแล้ว" })
  }

  const [editing, setEditing] = useState<AdminFabric | null>(null)
  const [editName, setEditName] = useState("")
  const [editPrice, setEditPrice] = useState("")
  const [editFiles, setEditFiles] = useState<File[]>([])

  const editPreviews = editFiles.length
    ? editFiles.map(f => URL.createObjectURL(f))
    : editing?.images || []

  const openEdit = (fab: AdminFabric) => {
    setEditing(fab)
    setEditName(fab.name)
    setEditPrice(String(fab.price))
    setEditFiles([])
  }

  const handleEdit = () => {
    if (!editing) return
    setSaving(true)
    const imgs = editFiles.length ? editPreviews.slice() : editing.images
    updateFabric(editing.id, { name: editName, price: Number(editPrice || 0), images: imgs })
    setFabrics([...mockFabrics])
    setSaving(false)
    setEditing(null)
    toast({ title: "บันทึกการแก้ไขแล้ว" })
  }

  const handleDelete = (id: string) => {
    if (typeof window !== "undefined" && !window.confirm("ยืนยันการลบ?")) return
    deleteFabric(id)
    setFabrics([...mockFabrics])
    toast({ title: "ลบลายผ้าแล้ว" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">จัดการผ้า (mock)</h1>
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> เพิ่มลายผ้าใหม่
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DHeader>
              <DialogTitle>เพิ่มลายผ้า</DialogTitle>
            </DHeader>
            <div className="space-y-4">
              <Input placeholder="ชื่อผ้า" value={addName} onChange={e => setAddName(e.target.value)} />
              <Input placeholder="ราคา" type="number" value={addPrice} onChange={e => setAddPrice(e.target.value)} />
              <Input type="file" multiple onChange={e => setAddFiles(Array.from(e.target.files ?? []))} />
              {addPreviews.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {addPreviews.map(src => (
                    <img key={src} src={src} alt="preview" className="h-20 w-20 object-cover rounded" />
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={handleAdd} disabled={saving || !addName}>
                บันทึก
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>รายการผ้า ({fabrics.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-8 text-sm text-gray-500">กำลังโหลด...</p>
          ) : fabrics.length === 0 ? (
            <p className="text-center py-8 text-sm text-gray-500">ไม่มีข้อมูลผ้า</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>รูป</TableHead>
                  <TableHead>ชื่อ</TableHead>
                  <TableHead>ราคา</TableHead>
                  <TableHead className="text-right">จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fabrics.map(f => (
                  <TableRow key={f.id}>
                    <TableCell>
                      {f.images[0] ? (
                        <img src={f.images[0]} alt={f.name} className="h-12 w-12 object-cover rounded" />
                      ) : (
                        <span className="text-xs text-gray-500">ไม่มีรูป</span>
                      )}
                    </TableCell>
                    <TableCell>{f.name}</TableCell>
                    <TableCell>฿{f.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog open={editing?.id === f.id} onOpenChange={v => (v ? openEdit(f) : setEditing(null))}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => openEdit(f)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg">
                            <DHeader>
                              <DialogTitle>แก้ไขลายผ้า</DialogTitle>
                            </DHeader>
                            <div className="space-y-4">
                              <Input value={editName} onChange={e => setEditName(e.target.value)} />
                              <Input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} />
                              <Input type="file" multiple onChange={e => setEditFiles(Array.from(e.target.files ?? []))} />
                              {editPreviews.length > 0 && (
                                <div className="flex gap-2 flex-wrap">
                                  {editPreviews.map(src => (
                                    <img key={src} src={src} alt="preview" className="h-20 w-20 object-cover rounded" />
                                  ))}
                                </div>
                              )}
                            </div>
                            <DialogFooter>
                              <Button onClick={handleEdit} disabled={saving || !editName}>บันทึก</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(f.id)} className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
