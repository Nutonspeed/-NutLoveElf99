"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Edit, Trash2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  loadTagNames,
  listTagNames,
  addTagName,
  removeTagName,
  updateTagName,
} from "@/lib/mock-customer-tags"

export default function AdminCustomerTagsPage() {
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [editing, setEditing] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")

  useEffect(() => {
    loadTagNames()
    setTags([...listTagNames()])
  }, [])

  const handleAdd = () => {
    if (!newTag.trim()) return
    addTagName(newTag.trim())
    setTags([...listTagNames()])
    setNewTag("")
  }

  const handleDelete = (tag: string) => {
    if (typeof window !== "undefined" && !window.confirm("ลบ tag นี้ใช่หรือไม่?")) return
    removeTagName(tag)
    setTags([...listTagNames()])
  }

  const startEdit = (index: number, tag: string) => {
    setEditing(index)
    setEditValue(tag)
  }

  const cancelEdit = () => {
    setEditing(null)
    setEditValue("")
  }

  const saveEdit = (oldName: string) => {
    if (!editValue.trim()) return
    updateTagName(oldName, editValue.trim())
    setTags([...listTagNames()])
    cancelEdit()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">จัดการแท็กลูกค้า</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>แท็กทั้งหมด ({tags.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="เพิ่มแท็กใหม่"
              />
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-1" /> เพิ่ม
              </Button>
            </div>
            {tags.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ชื่อแท็ก</TableHead>
                    <TableHead className="text-right">การจัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tags.map((t, idx) => (
                    <TableRow key={t}>
                      <TableCell>
                        {editing === idx ? (
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveEdit(t)
                              if (e.key === "Escape") cancelEdit()
                            }}
                          />
                        ) : (
                          t
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        {editing === idx ? (
                          <>
                            <Button size="icon" variant="outline" onClick={() => saveEdit(t)}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="outline" onClick={cancelEdit}>
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="outline" size="icon" onClick={() => startEdit(idx, t)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDelete(t)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-sm text-gray-500">ไม่มี tag ในระบบ</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
