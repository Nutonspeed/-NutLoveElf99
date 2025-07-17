"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import { mockOrders, updateOrderStatus } from "@/lib/mock/orders";
import { mockNotifications } from "@/lib/mock-notifications";
import { chatNotifications } from "@/lib/mock/chat-notify";
import DebugPanel from "@/components/admin/DebugPanel";
import { logEvent } from "@/lib/logs";
import type { Order } from "@/types/order";
import { toast } from "sonner";
import OrderSummary from "@/components/admin/dashboard/OrderSummary";
import NotificationList from "@/components/admin/dashboard/NotificationList";
import LatestOrders from "@/components/admin/dashboard/LatestOrders";

export default function AdminIndex() {
  const chatwootUrl =
    process.env.NEXT_PUBLIC_CHATWOOT_URL || "http://localhost:3000";

  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [debugOpen, setDebugOpen] = useState(false);


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

      <OrderSummary orders={orders} />

      <NotificationList
        title="การแจ้งเตือนล่าสุด"
        items={mockNotifications.slice(0, 5)}
        emptyText="ไม่มีแจ้งเตือนล่าสุด"
      />

      <NotificationList
        title="การแจ้งเตือนจากแชท"
        items={chatNotifications}
        emptyText="ไม่มีการแจ้งเตือนจากแชท"
      />

      <LatestOrders
        orders={orders}
        onMarkReady={markReady}
        onMarkCompleted={markCompleted}
      />
      {debugOpen && <DebugPanel />}
    </div>
  );
}
