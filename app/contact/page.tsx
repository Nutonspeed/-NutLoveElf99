"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "ส่งข้อความสำเร็จ!",
        description: "เราจะติดต่อกลับภายใน 24 ชั่วโมง",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "ที่อยู่",
      details: ["123 ถนนสุขุมวิท แขวงคลองตัน", "เขตวัฒนา กรุงเทพฯ 10110"],
    },
    {
      icon: Phone,
      title: "โทรศัพท์",
      details: ["02-123-4567", "081-234-5678"],
    },
    {
      icon: Mail,
      title: "อีเมล",
      details: ["info@sofacover.com", "support@sofacover.com"],
    },
    {
      icon: Clock,
      title: "เวลาทำการ",
      details: ["จันทร์ - ศุกร์: 9:00 - 18:00", "เสาร์ - อาทิตย์: 10:00 - 16:00"],
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ติดต่อเรา</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">เรายินดีให้คำปรึกษาและตอบคำถามทุกเรื่องเกี่ยวกับผลิตภัณฑ์ของเรา</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <MessageCircle className="mr-3 h-6 w-6" />
                  ส่งข้อความถึงเรา
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">ชื่อ-นามสกุล *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">อีเมล *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">หัวข้อ *</Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกหัวข้อ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product-inquiry">สอบถามสินค้า</SelectItem>
                          <SelectItem value="order-status">สถานะคำสั่งซื้อ</SelectItem>
                          <SelectItem value="return-refund">การคืนสินค้า/เงิน</SelectItem>
                          <SelectItem value="technical-support">ปัญหาทางเทคนิค</SelectItem>
                          <SelectItem value="partnership">ความร่วมมือทางธุรกิจ</SelectItem>
                          <SelectItem value="other">อื่นๆ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">ข้อความ *</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="กรุณาระบุรายละเอียดที่ต้องการสอบถาม..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "กำลังส่ง..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        ส่งข้อความ
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6">ข้อมูลการติดต่อ</h2>
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <info.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                          <div className="space-y-1">
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-gray-600">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">ต้องการความช่วยเหลือด่วน?</h3>
                <p className="text-white/90 mb-4">ติดต่อทีมบริการลูกค้าของเราผ่านระบบแชทสด</p>
                <Button variant="secondary" className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  เริ่มแชท
                </Button>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardContent className="p-0">
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>แผนที่ตำแหน่งร้าน</p>
                    <p className="text-sm">(จะแสดงแผนที่จริงในเว็บไซต์จริง)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">คำถามที่พบบ่อย</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">จัดส่งใช้เวลานานแค่ไหน?</h3>
                <p className="text-gray-600 text-sm">
                  ปกติจัดส่งภายใน 2-3 วันทำการสำหรับพื้นที่กรุงเทพฯ และปริมณฑล และ 3-5 วันทำการสำหรับต่างจังหวัด
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">สามารถคืนสินค้าได้หรือไม่?</h3>
                <p className="text-gray-600 text-sm">สามารถคืนสินค้าได้ภายใน 30 วัน หากสินค้ายังอยู่ในสภาพเดิม และมีใบเสร็จการซื้อ</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">มีการรับประกันหรือไม่?</h3>
                <p className="text-gray-600 text-sm">สินค้าทุกชิ้นมีการรับประกันคุณภาพ 2 ปี หากมีปัญหาจากการผลิตสามารถเปลี่ยนใหม่ได้</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">วิธีการดูแลรักษาผ้าคลุมโซฟา?</h3>
                <p className="text-gray-600 text-sm">
                  แต่ละผลิตภัณฑ์จะมีคำแนะนำการดูแลแตกต่างกัน โปรดดูรายละเอียดในหน้าสินค้าหรือป้ายติดสินค้า
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
