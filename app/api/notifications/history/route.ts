import { NextResponse } from "next/server"
import { mockNotificationService } from "@/data/mock-notification-service"

export async function GET() {
  try {
    const history = mockNotificationService.getHistory()

    return NextResponse.json({
      success: true,
      history,
    })
  } catch (error) {
    console.error("Notification history API error:", error)
    return NextResponse.json({ success: false, error: "ไม่สามารถโหลดประวัติการแจ้งเตือนได้" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    mockNotificationService.clearHistory()

    return NextResponse.json({
      success: true,
      message: "ล้างประวัติการแจ้งเตือนสำเร็จ",
    })
  } catch (error) {
    console.error("Clear notification history API error:", error)
    return NextResponse.json({ success: false, error: "ไม่สามารถล้างประวัติได้" }, { status: 500 })
  }
}
