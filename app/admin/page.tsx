"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card";
import { Badge } from "@/components/ui/badge";
import { mockOrders, updateOrderStatus } from "@/lib/mock/orders";
import { mockNotifications } from "@/lib/mock-notifications";
import { chatNotifications } from "@/lib/mock/chat-notify";
import DebugPanel from "@/components/admin/DebugPanel";
import { logEvent } from "@/lib/logs";
import type { Order } from "@/types/order";
import { toast } from "sonner";
import { chatwootUrl } from "@/lib/chatwoot";

export default function AdminIndex() {

  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [debugOpen, setDebugOpen] = useState(false);

  let todayCount = 0;
  let todayIncome = 0;
  let unpaid = 0;
  let pending = 0;
  let ready = 0;
  let done = 0;
  if (Array.isArray(orders)) {
    const today = new Date().toDateString();
    for (const o of orders) {
      if (new Date(o.createdAt).toDateString() === today) {
        todayCount += 1;
        todayIncome += o.total;
      }
      if (o.status === "pendingPayment") unpaid += 1;
      if (o.status === "depositPaid") pending += 1;
      if (o.status === "paid" && o.shipping_status === "pending") ready += 1;
      if (o.status === "completed" || o.shipping_status === "delivered") done += 1;
    }
  }

  const latest = Array.isArray(orders)
    ? [...orders].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ).slice(0, 5)
    : [];

  const tag = (o: Order) => {
    if (o.status === "depositPaid")
      return <Badge className="bg-blue-500 text-white">รอมัดจำ</Badge>;
    if (o.status === "paid" && o.shipping_status === "pending")
      return <Badge className="bg-yellow-500 text-white">รอจัดส่ง</Badge>;
    if (o.status === "completed" || o.shipping_status === "delivered")
      return <Badge className="bg-green-500 text-white">ปิดยอดแล้ว</Badge>;
    if (o.status === "pendingPayment")
      return <Badge className="bg-red-500 text-white">ยังไม่โอน</Badge>;
    return (
      <Badge variant="outline" className="text-xs">
        {o.status}
      </Badge>
    );
  };

  const markReady = (id: string) => {
    updateOrderStatus(id, "packed");
    setOrders([...mockOrders]);
    logEvent('order_ready', { id });
    toast.success("สถานะอัปเดตแล้ว");
  };

  const markCompleted = (id: string) => {
    updateOrderStatus(id, "completed");
    setOrders([...mockOrders]);
    logEvent('order_completed', { id });
    toast.success("สถานะอัปเดตแล้ว");
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col gap-4 mb-4">
        <Button
          variant="default"
          size="lg"
          className="h-12"
          onClick={() => window.open(chatwootUrl, "_blank")}
        >
          แชทลูกค้า (Chatwoot)
        </Button>
        <Link href="/admin/dashboard">
          <Button variant="outline" size="lg" className="h-12">เข้าสู่แดชบอร์ด</Button>
        </Link>
        <Button
          variant="outline"
          size="lg"
          className="h-12"
          onClick={() => {
            const next = !debugOpen
            setDebugOpen(next)
            logEvent('toggle_debug', { open: next })
          }}
        >
          {debugOpen ? 'ปิด Debug' : 'เปิด Debug'}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">ออเดอร์วันนี้</p>
            <p className="text-2xl font-bold">{todayCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">รายได้วันนี้</p>
            <p className="text-2xl font-bold">฿{todayIncome.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">ยังไม่โอน</p>
            <p className="text-2xl font-bold">{unpaid}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">รอจัดส่ง</p>
            <p className="text-2xl font-bold">{ready}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>การแจ้งเตือนล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          {mockNotifications.length ? (
            <ul className="list-disc pl-5 space-y-1">
              {mockNotifications.slice(0, 5).map((n) => (
                <li key={n.id}>{n.message}</li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีแจ้งเตือนล่าสุด</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>การแจ้งเตือนจากแชท</CardTitle>
        </CardHeader>
        <CardContent>
          {chatNotifications.length ? (
            <ul className="list-disc pl-5 space-y-1">
              {chatNotifications.map((n) => (
                <li key={n.id}>{n.message}</li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีการแจ้งเตือนจากแชท</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>รายการล่าสุด</CardTitle>
          <Link href="/admin/orders">
            <Button size="sm" variant="outline">
              View all orders
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {latest.length ? (
            <ul className="space-y-2">
              {latest.map((o) => (
                <li
                  key={o.id}
                  className="flex items-center justify-between border-b pb-2 last:border-b-0"
                >
                  <div>
                    <p className="font-medium">{o.id}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(o.createdAt).toLocaleDateString("th-TH")}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {tag(o)}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => markReady(o.id)}
                    >
                      Mark as Ready
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => markCompleted(o.id)}
                    >
                      Mark as Completed
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
      ) : (
        <p>ไม่มีข้อมูลคำสั่งซื้อ</p>
      )}
      </CardContent>
      </Card>
      {debugOpen && <DebugPanel />}
    </div>
  );
}
