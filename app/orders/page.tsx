"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/buttons/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/cards/card";
import { Badge } from "@/components/ui/badge";
import { Package, Eye, Download, MessageCircle, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/modals/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/inputs/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { mockOrders } from "@/lib/mock-orders";
import { mockProducts } from "@/lib/mock-products";
import { mockFeedbacks } from "@/lib/mock-feedback";
import { mockClaims, createClaim, loadClaims } from "@/lib/mock-claims";
import { reviewReminder, loadReviewReminder } from "@/lib/mock-settings";
import { toast } from "sonner";
import type { OrderStatus, Order } from "@/types/order";
import {
  getOrderStatusBadgeVariant,
  getOrderStatusText,
} from "@/lib/order-status";
import { Progress } from "@/components/ui/progress";

function getProgress(status: OrderStatus) {
  switch (status) {
    case "depositPaid":
      return 25;
    case "paid":
    case "packed":
      return 50;
    case "shipped":
      return 75;
    case "delivered":
      return 100;
    default:
      return 10;
  }
}

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const { dispatch } = useCart();
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [claimOpen, setClaimOpen] = useState(false);
  const [claimOrder, setClaimOrder] = useState<string | null>(null);
  const [claimReason, setClaimReason] = useState('');
  const [claimDesc, setClaimDesc] = useState('');
  const [claimFile, setClaimFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    loadClaims();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    loadReviewReminder();
    if (!reviewReminder) return;
    const pending = mockOrders.find(
      (o) =>
        o.customerId === user?.id &&
        o.status === "delivered" &&
        Date.now() - new Date(o.createdAt).getTime() >
          3 * 24 * 60 * 60 * 1000 &&
        !mockFeedbacks.find((f) => f.orderId === o.id),
    );
    if (pending) {
      toast.info("กรุณารีวิวคำสั่งซื้อ", {
        action: {
          label: "รีวิว",
          onClick: () => {
            window.location.href = `/feedback/${pending.id}`;
          },
        },
      });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  const userOrders = mockOrders.filter(
    (order) =>
      order.customerId === user?.id &&
      (statusFilter === "all" || order.status === statusFilter),
  );

  const handleReorder = (order: Order) => {
    for (const item of order.items) {
      const product = mockProducts.find((p) => p.id === item.productId)
      if (!product || !product.inStock || product.status === "draft") {
        toast.error(`สินค้า ${item.productName} ไม่สามารถสั่งซ้ำได้`)
        return
      }
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: item.productId,
          name: item.productName,
          price: item.price,
          image: "/placeholder.svg",
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        },
      })
    }
    if (typeof window !== "undefined") {
      sessionStorage.setItem("reorderFromId", order.id);
    }
  };

  const handleClaimSubmit = () => {
    if (!claimOrder) return;
    const newClaim = createClaim({
      orderId: claimOrder,
      image: claimFile ? '/placeholder.svg' : '',
      reason: `${claimReason} ${claimDesc}`.trim(),
    });
    if (!newClaim) {
      toast.error('ไม่สามารถส่งคำขอเคลม กรุณาลองใหม่อีกครั้ง');
    } else {
      toast.success('คำขอเคลมถูกส่งแล้ว รอเจ้าหน้าที่ติดต่อกลับ');
      setClaimOpen(false);
      setClaimOrder(null);
      setClaimReason('');
      setClaimDesc('');
      setClaimFile(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">ประวัติการสั่งซื้อ</h1>
            <p className="text-gray-600">
              ตรวจสอบสถานะและรายละเอียดคำสั่งซื้อของคุณ
            </p>
          </div>
          <select
            className="border rounded-md p-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">ทั้งหมด</option>
            <option value="pendingPayment">รอชำระเงิน</option>
            <option value="depositPaid">มัดจำแล้ว</option>
            <option value="paid">ชำระแล้ว</option>
            <option value="shipped">จัดส่งแล้ว</option>
            <option value="delivered">ส่งมอบแล้ว</option>
          </select>
        </div>

        {userOrders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">ยังไม่มีคำสั่งซื้อ</h2>
            <p className="text-gray-600 mb-8">
              เริ่มช้อปปิ้งเพื่อสร้างคำสั่งซื้อแรกของคุณ
            </p>
            <Link href="/products">
              <Button size="lg">เริ่มช้อปปิ้ง</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {userOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        คำสั่งซื้อ {order.id}
                      </CardTitle>
                      {mockClaims.some(c => c.orderId === order.id) && (
                        <Badge variant="outline" className="bg-yellow-200 text-yellow-800 mt-1">
                          <Shield className="h-3 w-3 mr-1 inline" /> มีการเคลม
                        </Badge>
                      )}
                      <p className="text-sm text-gray-600">
                        สั่งซื้อเมื่อ{" "}
                        {new Date(order.createdAt).toLocaleDateString("th-TH")}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getOrderStatusBadgeVariant(order.status)}>
                        {getOrderStatusText(order.status)}
                      </Badge>
                      <Progress
                        className="w-24"
                        value={getProgress(order.status)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b last:border-b-0"
                        >
                          <div>
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-sm text-gray-600">
                              {item.size && `ขนาด: ${item.size}`}
                              {item.color && ` | สี: ${item.color}`}
                              {` | จำนวน: ${item.quantity}`}
                            </p>
                          </div>
                          <p className="font-semibold">
                            ฿{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Order Total */}
                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="font-semibold">ยอดรวมทั้งสิ้น:</span>
                      <span className="text-xl font-bold text-primary">
                        ฿{order.total.toLocaleString()}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-4">
                      <Link href={`/orders/${order.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          ดูรายละเอียด
                        </Button>
                      </Link>

                      {order.status === "paid" && (
                        <Link href={`/invoice/${order.id}`}>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            ดาวน์โหลดใบเสร็จ
                          </Button>
                        </Link>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReorder(order)}
                      >
                        สั่งซ้ำ
                      </Button>

                      <Link href="/chat">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          ติดต่อเรา
                        </Button>
                      </Link>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setClaimOrder(order.id);
                          setClaimOpen(true);
                        }}
                      >
                        แจ้งเคลมสินค้า
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={claimOpen} onOpenChange={setClaimOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>แจ้งเคลมสินค้า</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>เหตุผล</Label>
              <Select value={claimReason} onValueChange={setClaimReason}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกเหตุผล" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="damage">สินค้าเสียหาย</SelectItem>
                  <SelectItem value="wrong">ส่งสินค้าผิด</SelectItem>
                  <SelectItem value="other">อื่นๆ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">รายละเอียดเพิ่มเติม</Label>
              <textarea
                id="desc"
                className="w-full border rounded p-2"
                rows={3}
                value={claimDesc}
                onChange={(e) => setClaimDesc(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">รูปประกอบ (ไม่บังคับ)</Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={(e) => setClaimFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleClaimSubmit}>ส่งคำขอ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
