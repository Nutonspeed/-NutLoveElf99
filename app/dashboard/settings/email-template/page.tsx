"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/inputs/input"
import { Textarea } from "@/components/ui/textarea"
import {
  emailTemplates,
  addEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
  loadEmailData,
  setSelectedTemplate,
  selectedTemplateId,
} from "@/lib/mock-email"

export default function EmailTemplatePage() {
  const [templates, setTemplates] = useState(emailTemplates)
  const [editing, setEditing] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    loadEmailData()
    setTemplates([...emailTemplates])
  }, [])

  const startEdit = (id: string) => {
    const t = emailTemplates.find((t) => t.id === id)
    if (t) {
      setEditing(id)
      setName(t.name)
      setSubject(t.subject)
      setContent(t.content)
    }
  }

  const handleSave = () => {
    if (editing) {
      updateEmailTemplate(editing, { name, subject, content })
    } else {
      addEmailTemplate({ name, subject, content })
    }
    setTemplates([...emailTemplates])
    setEditing(null)
    setName("")
    setSubject("")
    setContent("")
  }

  const handleDelete = (id: string) => {
    deleteEmailTemplate(id)
    setTemplates([...emailTemplates])
  }

  const handleSelect = (id: string) => {
    setSelectedTemplate(id)
    setTemplates([...emailTemplates])
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Email Templates</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((t) => (
          <div key={t.id} className="border rounded p-4 space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">
                {t.name}
                {t.id === selectedTemplateId && (
                  <span className="ml-2 text-sm text-primary">(ใช้)</span>
                )}
              </h2>
              <div className="space-x-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(t.id)}>
                  แก้ไข
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleSelect(t.id)}>
                  ใช้งาน
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(t.id)}>
                  ลบ
                </Button>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: t.content }} className="border p-2 text-sm" />
          </div>
        ))}
      </div>
      <div className="border-t pt-4 space-y-2 max-w-2xl">
        <h2 className="font-semibold">{editing ? "แก้ไขเทมเพลต" : "สร้างเทมเพลต"}</h2>
        <Input placeholder="ชื่อ" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="หัวข้อ" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <Textarea
          className="h-40"
          placeholder="เนื้อหา HTML"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={handleSave}>{editing ? "บันทึก" : "สร้าง"}</Button>
      </div>
    </div>
  )
}
