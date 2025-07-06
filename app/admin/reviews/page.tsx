"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Search, Star, Eye, MessageSquare, Trash2, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

interface Review {
  id: string
  productId: string
  productName: string
  customerId: string
  customerName: string
  rating: number
  comment: string
  createdAt: string
  status: "pending" | "approved" | "rejected"
  isVerified: boolean
}

export default function AdminReviewsPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [reviews, setReviews] = useState<Review[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    if (user?.role !== "admin") {
      router.push("/")
      return
    }
    loadReviews()
  }, [isAuthenticated, user, router])

  const loadReviews = async () => {
    try {
      // Mock reviews data
      const mockReviews: Review[] = [
        {
          id: "1",
          productId: "1",
          productName: "ผ้าคลุมโซฟา Premium Velvet",
          customerId: "2",
          customerName: "John Doe",
          rating: 5,
          comment: "สินค้าดีมาก คุณภาพเยี่ยม ใช้งานง่าย แนะนำเลยครับ ผ้านุ่มมาก สีสวย",
          createdAt: "2024-01-15T10:30:00Z",
          status: "approved",
          isVerified: true,
        },
        {
          id: "2",
          productId: "2",
          productName: "ผ้าคลุมโซฟา Cotton Blend",
          customerId: "3",
          customerName: "Jane Smith",
          rating: 4,
          comment: "ผ้าคลุมสวยมาก เข้ากับโซฟาได้ดี แต่การจัดส่งช้าไปหน่อย",
          createdAt: "2024-01-14T14:20:00Z",
          status: "approved",
          isVerified: true,
        },
        {
          id: "3",
          productId: "1",
          productName: "ผ้าคลุมโซฟา Premium Velvet",
          customerId: "4",
          customerName: "Mike Johnson",
          rating: 3,
          comment: "โอเค แต่ไม่ได้ดีเท่าที่คิด ราคาแพงไปหน่อย",
          createdAt: "2024-01-13T09:15:00Z",
          status: "pending",
          isVerified: false,
        },
        {
          id: "4",
          productId: "3",
          productName: "ผ้าคลุมโซฟา Waterproof Pro",
          customerId: "5",
          customerName: "Sarah Wilson",
          rating: 5,
          comment: "เยี่ยมมาก! กันน้ำได้จริง ลูกหกน้ำใส่ไม่เปียก ซักง่ายด้วย",
          createdAt: "2024-01-12T16:45:00Z",
          status: "approved",
          isVerified: true,
        },
        {
          id: "5",
          productId: "2",
          productName: "ผ้าคลุมโซฟา Cotton Blend",
          customerId: "6",
          customerName: "David Brown",
          rating: 2,
          comment: "ผ้าบางไป ไม่ค่อยทนทาน ใช้ได้แค่ 2 เดือนก็เริ่มขาด",
          createdAt: "2024-01-11T11:20:00Z",
          status: "rejected",
          isVerified: false,
        },
        {
          id: "6",
          productId: "4",
          productName: "ผ้าคลุมโซฟา Luxury Leather Look",
          customerId: "7",
          customerName: "Lisa Anderson",
          rating: 4,
          comment: "ดูหรูหราดี แต่ในฤดูร้อนจะร้อนไปหน่อย",
          createdAt: "2024-01-10T13:30:00Z",
          status: "pending",
          isVerified: false,
        },
      ]
      setReviews(mockReviews)
    } catch (error) {
      console.error("Error loading reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateReviewStatus = (reviewId: string, status: "approved" | "rejected") => {
    setReviews(reviews.map((review) => (review.id === reviewId ? { ...review, status } : review)))
  }

  const deleteReview = (reviewId: string) => {
    setReviews(reviews.filter((review) => review.id !== reviewId))
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || review.status === statusFilter
    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter

    return matchesSearch && matchesStatus && matchesRating
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "pending":
        return "secondary"
      case "rejected":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "อนุมัติแล้ว"
      case "pending":
        return "รอการอนุมัติ"
      case "rejected":
        return "ปฏิเสธ"
      default:
        return status
    }
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่มีสิทธิ์เข้าถึง</h1>
          <Link href="/login">
            <Button>เข้าสู่ระบบ</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>กำลังโหลดข้อมูลรีวิว...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">จัดการรีวิวลูกค้า</h1>
            <p className="text-gray-600">อนุมัติและจัดการรีวิวจากลูกค้า</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">รีวิวทั้งหมด</p>
                  <p className="text-2xl font-bold">{reviews.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">รอการอนุมัติ</p>
                  <p className="text-2xl font-bold">{reviews.filter((r) => r.status === "pending").length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">อนุมัติแล้ว</p>
                  <p className="text-2xl font-bold">{reviews.filter((r) => r.status === "approved").length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">คะแนนเฉลี่ย</p>
                  <p className="text-2xl font-bold">
                    {reviews.length > 0
                      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                      : "0.0"}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle>รายการรีวิว ({filteredReviews.length})</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหารีวิว..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="สถานะ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="pending">รอการอนุมัติ</SelectItem>
                    <SelectItem value="approved">อนุมัติแล้ว</SelectItem>
                    <SelectItem value="rejected">ปฏิเสธ</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="คะแนน" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="5">5 ดาว</SelectItem>
                    <SelectItem value="4">4 ดาว</SelectItem>
                    <SelectItem value="3">3 ดาว</SelectItem>
                    <SelectItem value="2">2 ดาว</SelectItem>
                    <SelectItem value="1">1 ดาว</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>สินค้า</TableHead>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>คะแนน</TableHead>
                  <TableHead>ความคิดเห็น</TableHead>
                  <TableHead>วันที่</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium line-clamp-1">{review.productName}</p>
                        <p className="text-sm text-gray-500">ID: {review.productId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{review.customerName}</p>
                        {review.isVerified && (
                          <Badge variant="outline" className="text-xs mt-1">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            ยืนยันแล้ว
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-sm font-medium">{review.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="line-clamp-2 text-sm max-w-xs">{review.comment}</p>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{new Date(review.createdAt).toLocaleDateString("th-TH")}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(review.status)}>{getStatusText(review.status)}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => setSelectedReview(review)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>รายละเอียดรีวิว</DialogTitle>
                            </DialogHeader>
                            {selectedReview && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">สินค้า</label>
                                    <p className="font-medium">{selectedReview.productName}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">ลูกค้า</label>
                                    <p className="font-medium">{selectedReview.customerName}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">คะแนน</label>
                                    <div className="flex items-center space-x-1">
                                      {renderStars(selectedReview.rating)}
                                      <span className="ml-2 font-medium">{selectedReview.rating}/5</span>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">วันที่รีวิว</label>
                                    <p>{new Date(selectedReview.createdAt).toLocaleDateString("th-TH")}</p>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">ความคิดเห็น</label>
                                  <Textarea value={selectedReview.comment} readOnly className="mt-2" rows={4} />
                                </div>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <Badge variant={getStatusBadgeVariant(selectedReview.status)}>
                                      {getStatusText(selectedReview.status)}
                                    </Badge>
                                    {selectedReview.isVerified && (
                                      <Badge variant="outline" className="ml-2">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        ลูกค้าที่ยืนยันแล้ว
                                      </Badge>
                                    )}
                                  </div>
                                  {selectedReview.status === "pending" && (
                                    <div className="flex space-x-2">
                                      <Button
                                        size="sm"
                                        onClick={() => updateReviewStatus(selectedReview.id, "approved")}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        อนุมัติ
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => updateReviewStatus(selectedReview.id, "rejected")}
                                      >
                                        <XCircle className="h-4 w-4 mr-1" />
                                        ปฏิเสธ
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {review.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateReviewStatus(review.id, "approved")}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateReviewStatus(review.id, "rejected")}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteReview(review.id)}
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

            {filteredReviews.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">ไม่พบรีวิวที่ตรงกับเงื่อนไขการค้นหา</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
