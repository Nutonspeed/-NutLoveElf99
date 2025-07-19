"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, MapPin, Shield, Bell } from "lucide-react"
import Link from "next/link"
import { mockCustomers } from "@/core/mock/customers"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const customer = mockCustomers.find((c) => c.id === user?.id)

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: user?.email || "",
    phone: "081-234-5678",
    birthDate: "1990-01-01",
    gender: "male",
  })

  const [addressData, setAddressData] = useState({
    address: "123 ถนนสุขุมวิท",
    city: "กรุงเทพฯ",
    postalCode: "10110",
    country: "ไทย",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "อัพเดทโปรไฟล์สำเร็จ",
      description: "ข้อมูลโปรไฟล์ของคุณได้รับการอัพเดทแล้ว",
    })
  }

  const handleAddressUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "อัพเดทที่อยู่สำเร็จ",
      description: "ที่อยู่ของคุณได้รับการอัพเดทแล้ว",
    })
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">โปรไฟล์ของฉัน</h1>

          {customer && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{customer.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600">{customer.email}</p>
                <p>แต้มสะสม: {customer.points ?? 0}</p>
                <p>Tier: {customer.tier || "-"}</p>
                <Link href="/profile/orders">
                  <Button className="mt-2">ดูคำสั่งซื้อ</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">ข้อมูลส่วนตัว</TabsTrigger>
              <TabsTrigger value="address">ที่อยู่</TabsTrigger>
              <TabsTrigger value="security">ความปลอดภัย</TabsTrigger>
              <TabsTrigger value="preferences">การตั้งค่า</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Picture */}
                <Card>
                  <CardHeader>
                    <CardTitle>รูปโปรไฟล์</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <Avatar className="w-32 h-32 mx-auto">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{user?.name}</h3>
                      <p className="text-gray-600">{user?.email}</p>
                      <Badge className="mt-2">{user?.role === "admin" ? "ผู้ดูแลระบบ" : "ลูกค้า"}</Badge>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      เปลี่ยนรูปโปรไฟล์
                    </Button>
                  </CardContent>
                </Card>

                {/* Profile Form */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="mr-2 h-5 w-5" />
                        ข้อมูลส่วนตัว
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">ชื่อ</Label>
                            <Input
                              id="firstName"
                              value={profileData.firstName}
                              onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">นามสกุล</Label>
                            <Input
                              id="lastName"
                              value={profileData.lastName}
                              onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">อีเมล</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="birthDate">วันเกิด</Label>
                            <Input
                              id="birthDate"
                              type="date"
                              value={profileData.birthDate}
                              onChange={(e) => setProfileData({ ...profileData, birthDate: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gender">เพศ</Label>
                            <select
                              id="gender"
                              value={profileData.gender}
                              onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                              <option value="male">ชาย</option>
                              <option value="female">หญิง</option>
                              <option value="other">อื่นๆ</option>
                            </select>
                          </div>
                        </div>

                        <Button type="submit" className="w-full">
                          บันทึกการเปลี่ยนแปลง
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Address Tab */}
            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    ที่อยู่จัดส่ง
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddressUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">ที่อยู่</Label>
                      <Input
                        id="address"
                        value={addressData.address}
                        onChange={(e) => setAddressData({ ...addressData, address: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">จังหวัด</Label>
                        <Input
                          id="city"
                          value={addressData.city}
                          onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">รหัสไปรษณีย์</Label>
                        <Input
                          id="postalCode"
                          value={addressData.postalCode}
                          onChange={(e) => setAddressData({ ...addressData, postalCode: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">ประเทศ</Label>
                      <Input
                        id="country"
                        value={addressData.country}
                        onChange={(e) => setAddressData({ ...addressData, country: e.target.value })}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      บันทึกที่อยู่
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5" />
                      เปลี่ยนรหัสผ่าน
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">รหัสผ่านปัจจุบัน</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">รหัสผ่านใหม่</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">ยืนยันรหัสผ่านใหม่</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      <Button type="submit" className="w-full">
                        เปลี่ยนรหัสผ่าน
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>การยืนยันตัวตนแบบสองขั้นตอน</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">การยืนยันตัวตนแบบสองขั้นตอน</p>
                        <p className="text-sm text-gray-600">เพิ่มความปลอดภัยให้กับบัญชีของคุณ</p>
                      </div>
                      <Button variant="outline">เปิดใช้งาน</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="mr-2 h-5 w-5" />
                      การแจ้งเตือน
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">แจ้งเตือนทางอีเมล</p>
                        <p className="text-sm text-gray-600">รับข้อมูลข่าวสารและโปรโมชั่น</p>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">แจ้งเตือนสถานะคำสั่งซื้อ</p>
                        <p className="text-sm text-gray-600">รับการแจ้งเตือนเมื่อสถานะคำสั่งซื้อเปลี่ยนแปลง</p>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">แจ้งเตือนสินค้าใหม่</p>
                        <p className="text-sm text-gray-600">รับข้อมูลเมื่อมีสินค้าใหม่</p>
                      </div>
                      <input type="checkbox" className="toggle" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>ภาษาและสกุลเงิน</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">ภาษา</Label>
                      <select id="language" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="th">ไทย</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">สกุลเงิน</Label>
                      <select id="currency" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="thb">บาท (THB)</option>
                        <option value="usd">ดอลลาร์ (USD)</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}
