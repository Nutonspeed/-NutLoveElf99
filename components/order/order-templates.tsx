"use client"

import { useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/modals/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Save, Trash2, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface OrderTemplate {
  id: string
  name: string
  description?: string
  customerInfo: {
    name: string
    phone: string
    email?: string
    address: string
  }
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
    size?: string
    color?: string
  }>
  notes?: string
  createdAt: Date
}

interface OrderTemplatesProps {
  onApplyTemplate: (template: OrderTemplate) => void
}

export function OrderTemplates({ onApplyTemplate }: OrderTemplatesProps) {
  const [templates, setTemplates] = useState<OrderTemplate[]>([
    {
      id: "1",
      name: "ลูกค้าประจำ - คุณสมชาย",
      description: "เทมเพลตสำหรับคุณสมชาย ลูกค้าประจำ",
      customerInfo: {
        name: "สมชาย ใจดี",
        phone: "081-234-5678",
        email: "somchai@email.com",
        address: "123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองตัน กรุงเทพฯ 10110",
      },
      items: [
        {
          productId: "1",
          productName: "ผ้าคลุมโซฟา 3 ที่นั่ง - สีน้ำเงิน",
          quantity: 1,
          price: 1500,
          size: "L",
          color: "น้ำเงิน",
        },
      ],
      notes: "ลูกค้าประจำ ส่งแบบด่วน",
      createdAt: new Date(),
    },
  ])

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newTemplate, setNewTemplate] = useState<Partial<OrderTemplate>>({
    name: "",
    description: "",
    customerInfo: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
    items: [],
    notes: "",
  })

  const { toast } = useToast()

  const handleSaveTemplate = () => {
    if (!newTemplate.name || !newTemplate.customerInfo?.name) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกชื่อเทมเพลตและชื่อลูกค้า",
        variant: "destructive",
      })
      return
    }

    const template: OrderTemplate = {
      id: Date.now().toString(),
      name: newTemplate.name!,
      description: newTemplate.description,
      customerInfo: newTemplate.customerInfo!,
      items: newTemplate.items || [],
      notes: newTemplate.notes,
      createdAt: new Date(),
    }

    setTemplates((prev) => [...prev, template])
    setIsCreateOpen(false)
    setNewTemplate({
      name: "",
      description: "",
      customerInfo: { name: "", phone: "", email: "", address: "" },
      items: [],
      notes: "",
    })

    toast({
      title: "บันทึกเทมเพลตสำเร็จ",
      description: `เทมเพลต "${template.name}" ถูกบันทึกแล้ว`,
    })
  }

  const handleDeleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id))
    toast({
      title: "ลบเทมเพลตสำเร็จ",
      description: "เทมเพลตถูกลบออกจากระบบแล้ว",
    })
  }

  const handleApplyTemplate = (template: OrderTemplate) => {
    onApplyTemplate(template)
    toast({
      title: "นำเทมเพลตมาใช้สำเร็จ",
      description: `ข้อมูลจากเทมเพลต "${template.name}" ถูกนำมาใช้แล้ว`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">เทมเพลตออเดอร์</h3>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              สร้างเทมเพลต
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>สร้างเทมเพลตใหม่</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="template-name">ชื่อเทมเพลต</Label>
                  <Input
                    id="template-name"
                    value={newTemplate.name || ""}
                    onChange={(e) => setNewTemplate((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="เช่น ลูกค้าประจำ - คุณสมชาย"
                  />
                </div>
                <div>
                  <Label htmlFor="template-desc">คำอธิบาย (ไม่บังคับ)</Label>
                  <Input
                    id="template-desc"
                    value={newTemplate.description || ""}
                    onChange={(e) => setNewTemplate((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="คำอธิบายเทมเพลต"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">ข้อมูลลูกค้า</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customer-name">ชื่อลูกค้า</Label>
                    <Input
                      id="customer-name"
                      value={newTemplate.customerInfo?.name || ""}
                      onChange={(e) =>
                        setNewTemplate((prev) => ({
                          ...prev,
                          customerInfo: { ...prev.customerInfo!, name: e.target.value },
                        }))
                      }
                      placeholder="ชื่อ-นามสกุล"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer-phone">เบอร์โทร</Label>
                    <Input
                      id="customer-phone"
                      value={newTemplate.customerInfo?.phone || ""}
                      onChange={(e) =>
                        setNewTemplate((prev) => ({
                          ...prev,
                          customerInfo: { ...prev.customerInfo!, phone: e.target.value },
                        }))
                      }
                      placeholder="081-234-5678"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="customer-address">ที่อยู่</Label>
                  <Textarea
                    id="customer-address"
                    value={newTemplate.customerInfo?.address || ""}
                    onChange={(e) =>
                      setNewTemplate((prev) => ({
                        ...prev,
                        customerInfo: { ...prev.customerInfo!, address: e.target.value },
                      }))
                    }
                    placeholder="ที่อยู่สำหรับจัดส่ง"
                    rows={3}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="template-notes">หมายเหตุ</Label>
                <Textarea
                  id="template-notes"
                  value={newTemplate.notes || ""}
                  onChange={(e) => setNewTemplate((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="หมายเหตุเพิ่มเติม"
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  ยกเลิก
                </Button>
                <Button onClick={handleSaveTemplate}>
                  <Save className="h-4 w-4 mr-2" />
                  บันทึกเทมเพลต
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  {template.description && <p className="text-sm text-muted-foreground mt-1">{template.description}</p>}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">{template.customerInfo.name}</p>
                <p className="text-xs text-muted-foreground">{template.customerInfo.phone}</p>
              </div>

              {template.items.length > 0 && (
                <div>
                  <Badge variant="secondary" className="text-xs">
                    {template.items.length} รายการ
                  </Badge>
                </div>
              )}

              <Button size="sm" className="w-full" onClick={() => handleApplyTemplate(template)}>
                <Copy className="h-4 w-4 mr-2" />
                ใช้เทมเพลต
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {templates.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">ยังไม่มีเทมเพลต</p>
            <p className="text-sm text-muted-foreground mt-1">สร้างเทมเพลตเพื่อความสะดวกในการสร้างออเดอร์</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
