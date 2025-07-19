"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/modals/dialog"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, Plus, Edit, Trash2, Search, CalendarIcon, Percent, DollarSign } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { th } from "date-fns/locale"
import { db } from "@/lib/database"

interface Coupon {
  id: string
  code: string
  discount: number
  type: "percentage" | "fixed"
  active: boolean
  minAmount?: number
  maxDiscount?: number
  usageLimit?: number
  usageCount: number
  validFrom: string
  validUntil: string
  description?: string
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [loading, setLoading] = useState(true)

  // Form states
  const [formData, setFormData] = useState({
    code: "",
    discount: 0,
    type: "percentage" as "percentage" | "fixed",
    active: true,
    minAmount: 0,
    maxDiscount: 0,
    usageLimit: 0,
    validFrom: new Date(),
    validUntil: new Date(),
    description: "",
  })

  useEffect(() => {
    loadCoupons()
  }, [])

  const loadCoupons = async () => {
    try {
      const couponsData = await db.getCoupons()
      // Add mock data for demonstration
      const mockCoupons: Coupon[] = [
        {
          id: "1",
          code: "SAVE10",
          discount: 10,
          type: "percentage",
          active: true,
          minAmount: 1000,
          maxDiscount: 500,
          usageLimit: 100,
          usageCount: 25,
          validFrom: new Date().toISOString(),
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          description: "ลด 10% สำหรับการซื้อขั้นต่ำ 1,000 บาท",
        },
        {
          id: "2",
          code: "WELCOME20",
          discount: 20,
          type: "percentage",
          active: true,
          minAmount: 2000,
          maxDiscount: 1000,
          usageLimit: 50,
          usageCount: 12,
          validFrom: new Date().toISOString(),
          validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
          description: "ลด 20% สำหรับลูกค้าใหม่",
        },
        {
          id: "3",
          code: "FREESHIP",
          discount: 100,
          type: "fixed",
          active: true,
          minAmount: 1500,
          usageLimit: 200,
          usageCount: 45,
          validFrom: new Date().toISOString(),
          validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          description: "ฟรีค่าจัดส่งสำหรับการซื้อขั้นต่ำ 1,500 บาท",
        },
        {
          id: "4",
          code: "SUMMER50",
          discount: 50,
          type: "fixed",
          active: false,
          minAmount: 3000,
          usageLimit: 30,
          usageCount: 30,
          validFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          validUntil: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          description: "ลด 50 บาท สำหรับฤดูร้อน (หมดอายุแล้ว)",
        },
      ]
      setCoupons(mockCoupons)
    } catch (error) {
      console.error("Error loading coupons:", error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      code: "",
      discount: 0,
      type: "percentage",
      active: true,
      minAmount: 0,
      maxDiscount: 0,
      usageLimit: 0,
      validFrom: new Date(),
      validUntil: new Date(),
      description: "",
    })
  }

  const handleCreateCoupon = () => {
    const newCoupon: Coupon = {
      id: Date.now().toString(),
      ...formData,
      usageCount: 0,
      validFrom: formData.validFrom.toISOString(),
      validUntil: formData.validUntil.toISOString(),
    }
    setCoupons([...coupons, newCoupon])
    setIsCreateDialogOpen(false)
    resetForm()
  }

  const handleEditCoupon = () => {
    if (!editingCoupon) return

    const updatedCoupons = coupons.map((coupon) =>
      coupon.id === editingCoupon.id
        ? {
            ...coupon,
            ...formData,
            validFrom: formData.validFrom.toISOString(),
            validUntil: formData.validUntil.toISOString(),
          }
        : coupon,
    )
    setCoupons(updatedCoupons)
    setEditingCoupon(null)
    resetForm()
  }

  const handleDeleteCoupon = (couponId: string) => {
    setCoupons(coupons.filter((c) => c.id !== couponId))
  }

  const toggleCouponStatus = (couponId: string) => {
    setCoupons(coupons.map((coupon) => (coupon.id === couponId ? { ...coupon, active: !coupon.active } : coupon)))
  }

  const openEditDialog = (coupon: Coupon) => {
    setEditingCoupon(coupon)
    setFormData({
      code: coupon.code,
      discount: coupon.discount,
      type: coupon.type,
      active: coupon.active,
      minAmount: coupon.minAmount || 0,
      maxDiscount: coupon.maxDiscount || 0,
      usageLimit: coupon.usageLimit || 0,
      validFrom: new Date(coupon.validFrom),
      validUntil: new Date(coupon.validUntil),
      description: coupon.description || "",
    })
  }


  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>กำลังโหลดข้อมูลคูปอง...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">จัดการคูปองส่วนลด</h1>
              <p className="text-gray-600">สร้างและจัดการคูปองส่วนลดสำหรับลูกค้า</p>
            </div>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                สร้างคูปองใหม่
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>สร้างคูปองส่วนลดใหม่</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">รหัสคูปอง</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="เช่น SAVE10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">ประเภทส่วนลด</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: "percentage" | "fixed") => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">เปอร์เซ็นต์ (%)</SelectItem>
                      <SelectItem value="fixed">จำนวนเงิน (บาท)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">จำนวนส่วนลด</Label>
                  <Input
                    id="discount"
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                    placeholder={formData.type === "percentage" ? "10" : "100"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minAmount">ยอดซื้อขั้นต่ำ (บาท)</Label>
                  <Input
                    id="minAmount"
                    type="number"
                    value={formData.minAmount}
                    onChange={(e) => setFormData({ ...formData, minAmount: Number(e.target.value) })}
                    placeholder="1000"
                  />
                </div>
                {formData.type === "percentage" && (
                  <div className="space-y-2">
                    <Label htmlFor="maxDiscount">ส่วนลดสูงสุด (บาท)</Label>
                    <Input
                      id="maxDiscount"
                      type="number"
                      value={formData.maxDiscount}
                      onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                      placeholder="500"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="usageLimit">จำนวนการใช้งานสูงสุด</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                    placeholder="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label>วันที่เริ่มใช้งาน</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(formData.validFrom, "dd/MM/yyyy", { locale: th })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.validFrom}
                        onSelect={(date) => date && setFormData({ ...formData, validFrom: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>วันที่หมดอายุ</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(formData.validUntil, "dd/MM/yyyy", { locale: th })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.validUntil}
                        onSelect={(date) => date && setFormData({ ...formData, validUntil: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">คำอธิบาย</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="คำอธิบายคูปอง"
                  />
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <Switch
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                  />
                  <Label>เปิดใช้งานคูปอง</Label>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  ยกเลิก
                </Button>
                <Button onClick={handleCreateCoupon}>สร้างคูปอง</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">คูปองทั้งหมด</p>
                  <p className="text-2xl font-bold">{coupons.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Percent className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">คูปองที่ใช้งานได้</p>
                  <p className="text-2xl font-bold">{coupons.filter((c) => c.active).length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Percent className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">การใช้งานรวม</p>
                  <p className="text-2xl font-bold">{coupons.reduce((sum, c) => sum + c.usageCount, 0)}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">คูปองหมดอายุ</p>
                  <p className="text-2xl font-bold">
                    {coupons.filter((c) => new Date(c.validUntil) < new Date()).length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <CalendarIcon className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>รายการคูปอง ({filteredCoupons.length})</CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ค้นหาคูปอง..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>รหัสคูปอง</TableHead>
                  <TableHead>ส่วนลด</TableHead>
                  <TableHead>เงื่อนไข</TableHead>
                  <TableHead>การใช้งาน</TableHead>
                  <TableHead>วันหมดอายุ</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{coupon.code}</p>
                        {coupon.description && (
                          <p className="text-sm text-gray-500 line-clamp-1">{coupon.description}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {coupon.type === "percentage" ? (
                          <Percent className="h-4 w-4 text-green-600" />
                        ) : (
                          <DollarSign className="h-4 w-4 text-blue-600" />
                        )}
                        <span className="font-semibold">
                          {coupon.discount}
                          {coupon.type === "percentage" ? "%" : " บาท"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {coupon.minAmount && <p>ขั้นต่ำ: ฿{coupon.minAmount.toLocaleString()}</p>}
                        {coupon.maxDiscount && coupon.type === "percentage" && (
                          <p>สูงสุด: ฿{coupon.maxDiscount.toLocaleString()}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>
                          {coupon.usageCount}/{coupon.usageLimit || "∞"}
                        </p>
                        <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                          <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{
                              width: coupon.usageLimit
                                ? `${Math.min((coupon.usageCount / coupon.usageLimit) * 100, 100)}%`
                                : "0%",
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{format(new Date(coupon.validUntil), "dd/MM/yyyy", { locale: th })}</p>
                        {new Date(coupon.validUntil) < new Date() && (
                          <Badge variant="destructive" className="text-xs mt-1">
                            หมดอายุ
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={coupon.active}
                          onCheckedChange={() => toggleCouponStatus(coupon.id)}
                        />
                        <Badge variant={coupon.active ? "default" : "secondary"}>
                          {coupon.active ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Dialog
                          open={editingCoupon?.id === coupon.id}
                          onOpenChange={(open) => !open && setEditingCoupon(null)}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => openEditDialog(coupon)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>แก้ไขคูปอง: {editingCoupon?.code}</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-code">รหัสคูปอง</Label>
                                <Input
                                  id="edit-code"
                                  value={formData.code}
                                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-type">ประเภทส่วนลด</Label>
                                <Select
                                  value={formData.type}
                                  onValueChange={(value: "percentage" | "fixed") =>
                                    setFormData({ ...formData, type: value })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="percentage">เปอร์เซ็นต์ (%)</SelectItem>
                                    <SelectItem value="fixed">จำนวนเงิน (บาท)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-discount">จำนวนส่วนลด</Label>
                                <Input
                                  id="edit-discount"
                                  type="number"
                                  value={formData.discount}
                                  onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-minAmount">ยอดซื้อขั้นต่ำ (บาท)</Label>
                                <Input
                                  id="edit-minAmount"
                                  type="number"
                                  value={formData.minAmount}
                                  onChange={(e) => setFormData({ ...formData, minAmount: Number(e.target.value) })}
                                />
                              </div>
                              {formData.type === "percentage" && (
                                <div className="space-y-2">
                                  <Label htmlFor="edit-maxDiscount">ส่วนลดสูงสุด (บาท)</Label>
                                  <Input
                                    id="edit-maxDiscount"
                                    type="number"
                                    value={formData.maxDiscount}
                                    onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                                  />
                                </div>
                              )}
                              <div className="space-y-2">
                                <Label htmlFor="edit-usageLimit">จำนวนการใช้งานสูงสุด</Label>
                                <Input
                                  id="edit-usageLimit"
                                  type="number"
                                  value={formData.usageLimit}
                                  onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>วันที่เริ่มใช้งาน</Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full justify-start text-left font-normal bg-transparent"
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {format(formData.validFrom, "dd/MM/yyyy", { locale: th })}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={formData.validFrom}
                                      onSelect={(date) => date && setFormData({ ...formData, validFrom: date })}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="space-y-2">
                                <Label>วันที่หมดอายุ</Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full justify-start text-left font-normal bg-transparent"
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {format(formData.validUntil, "dd/MM/yyyy", { locale: th })}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={formData.validUntil}
                                      onSelect={(date) => date && setFormData({ ...formData, validUntil: date })}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="col-span-2 space-y-2">
                                <Label htmlFor="edit-description">คำอธิบาย</Label>
                                <Input
                                  id="edit-description"
                                  value={formData.description}
                                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                              </div>
                              <div className="col-span-2 flex items-center space-x-2">
                                <Switch
                                  checked={formData.active}
                                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                                />
                                <Label>เปิดใช้งานคูปอง</Label>
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2 mt-6">
                              <Button variant="outline" onClick={() => setEditingCoupon(null)}>
                                ยกเลิก
                              </Button>
                              <Button onClick={handleEditCoupon}>บันทึกการแก้ไข</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteCoupon(coupon.id)}
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

            {filteredCoupons.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">ไม่พบคูปองที่ตรงกับเงื่อนไขการค้นหา</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
