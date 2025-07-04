import { type NextRequest, NextResponse } from "next/server"
import { mockNotificationService } from "@/lib/mock-notification-service"
import type { NotificationData } from "@/lib/mock-notification-service"

export async function POST(request: NextRequest) {
  try {
    const data: NotificationData = await request.json()

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!data.type || !data.recipient || !data.data) {
      return NextResponse.json({ success: false, error: "ข้อมูลไม่ครบถ้วน" }, { status: 400 })
    }

    // ส่งการแจ้งเตือน
    const success = await mockNotificationService.sendNotification(data)

    if (success) {
      return NextResponse.json({
        success: true,
        message: "ส่งการแจ้งเตือนสำเร็จ",
      })
    } else {
      return NextResponse.json({ success: false, error: "ไม่สามารถส่งการแจ้งเตือนได้" }, { status: 500 })
    }
  } catch (error) {
    console.error("Notification API error:", error)
    return NextResponse.json({ success: false, error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" }, { status: 500 })
  }
}
