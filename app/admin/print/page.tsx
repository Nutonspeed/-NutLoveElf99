"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/buttons/button"

export default function PrintSettingsPage() {
  const [invoiceTemplate, setInvoiceTemplate] = useState("Standard Invoice")
  const [shippingTemplate, setShippingTemplate] = useState("Default Label")

  const handleSave = () => {
    alert("บันทึกการตั้งค่าแล้ว (mock)")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ตั้งค่าการพิมพ์</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>แม่แบบใบแจ้งหนี้</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={invoiceTemplate}
              onChange={(e) => setInvoiceTemplate(e.target.value)}
              rows={6}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>แม่แบบสติกเกอร์จัดส่ง</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={shippingTemplate}
              onChange={(e) => setShippingTemplate(e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>
        <div className="text-right">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            บันทึก
          </Button>
        </div>
      </div>
    </div>
  )
}
