import { type NextRequest, NextResponse } from "next/server"
import { mockNotificationService } from "@/lib/mock-notification-service"

export async function POST(request: NextRequest) {
  try {
    const { type, email, phone } = await request.json()

    // ข้อมูลทดสอบ
    const testData = {
      productName: "ผ้าคลุมโซฟา 3 ที่นั่ง สีน้ำเงิน",
      productId: "SC-001",
      currentStock: type === "stock_out" ? 0 : 5,
      minStock: 10,
      location: "คลังสินค้า A-01",
      orderId: "ORD-2024-001",
      customerName: "คุณสมชาย ใจดี",
      totalAmount: "2,500",
      itemCount: 2,
    }

    const notificationData = {
      type: type as "stock_low" | "stock_out" | "stock_critical",
      recipient: {
        email: email || undefined,
        phone: phone || undefined,
        name: "ผู้ดูแลระบบ",
      },
      data: testData,
      priority: "high" as const,
    }

    const success = await mockNotificationService.sendNotification(notificationData)

    if (success) {
      return NextResponse.json({
        success: true,
        message: "ส่งการแจ้งเตือนทดสอบสำเร็จ",
      })
    } else {
      return NextResponse.json({ success: false, error: "ไม่สามารถส่งการแจ้งเตือนทดสอบได้" }, { status: 500 })
    }
  } catch (error) {
    console.error("Test notification API error:", error)
    return NextResponse.json({ success: false, error: "เกิดข้อผิดพลาดในการทดสอบ" }, { status: 500 })
  }
}
