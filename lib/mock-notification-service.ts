// Mock Notification Service สำหรับการทดสอบ
import { notifyTeams, loadNotifyTeams } from './mock-settings'
import { mockCustomers } from './mock-customers'
import { mockOrders } from './mock-orders'
import type { Customer } from './mock-customers'
export interface NotificationTemplate {
  id: string
  name: string
  type: "email" | "sms" | "line"
  subject?: string
  content: string
  variables: string[]
}

export interface NotificationData {
  type: "stock_low" | "stock_out" | "stock_critical" | "order_created" | "order_updated" | "system_alert"
  recipient: {
    email?: string
    phone?: string
    lineUserId?: string
    name?: string
  }
  data: Record<string, any>
  priority: "low" | "normal" | "high" | "urgent"
  scheduledAt?: Date
}

export interface NotificationHistory {
  id: string
  type: string
  channel: "email" | "sms" | "line"
  recipient: string
  subject?: string
  content: string
  status: "pending" | "sent" | "failed" | "delivered"
  error?: string
  sentAt?: string
  deliveredAt?: string
  createdAt: string
}

// Mock Email Service
class MockEmailService {
  async sendEmail(to: string, subject: string, html: string, text?: string): Promise<boolean> {
    // จำลองการส่งอีเมล
    console.log("📧 Mock Email Sent:", { to, subject })

    // จำลองความล่าช้าในการส่ง
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // จำลองอัตราความสำเร็จ 95%
    return Math.random() > 0.05
  }
}

// Mock SMS Service
class MockSMSService {
  async sendSMS(to: string, message: string): Promise<boolean> {
    // จำลองการส่ง SMS
    console.log("📱 Mock SMS Sent:", { to, message: message.substring(0, 50) + "..." })

    // จำลองความล่าช้าในการส่ง
    await new Promise((resolve) => setTimeout(resolve, 800))

    // จำลองอัตราความสำเร็จ 90%
    return Math.random() > 0.1
  }
}

// Mock Line Notify Service
class MockLineNotifyService {
  async sendLineNotify(message: string): Promise<boolean> {
    // จำลองการส่ง Line Notify
    console.log("💬 Mock Line Notify Sent:", message.substring(0, 50) + "...")

    // จำลองความล่าช้าในการส่ง
    await new Promise((resolve) => setTimeout(resolve, 600))

    // จำลองอัตราความสำเร็จ 98%
    return Math.random() > 0.02
  }
}

// Notification Templates
export const mockNotificationTemplates: Record<string, NotificationTemplate> = {
  stock_low_email: {
    id: "stock_low_email",
    name: "แจ้งเตือนสต็อกต่ำ - อีเมล",
    type: "email",
    subject: "⚠️ แจ้งเตือนสต็อกต่ำ - {{productName}}",
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
          <h2 style="color: #dc3545; margin: 0 0 20px 0;">⚠️ แจ้งเตือนสต็อกต่ำ</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 15px 0;">รายละเอียดสินค้า</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">ชื่อสินค้า:</td>
                <td style="padding: 8px 0;">{{productName}}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">รหัสสินค้า:</td>
                <td style="padding: 8px 0;">{{productId}}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">สต็อกปัจจุบัน:</td>
                <td style="padding: 8px 0; color: #dc3545; font-weight: bold;">{{currentStock}} ชิ้น</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">สต็อกขั้นต่ำ:</td>
                <td style="padding: 8px 0;">{{minStock}} ชิ้น</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">ตำแหน่ง:</td>
                <td style="padding: 8px 0;">{{location}}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; color: #856404;">
              <strong>คำแนะนำ:</strong> กรุณาตรวจสอบและเติมสต็อกสินค้าดังกล่าวเพื่อป้องกันการขาดแคลน
            </p>
          </div>
          
          <div style="text-align: center;">
            <a href="{{dashboardUrl}}" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              ไปยังหน้าจัดการสต็อก
            </a>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #dee2e6;">
          <p style="text-align: center; color: #6c757d; font-size: 14px; margin: 0;">
            ระบบแจ้งเตือนอัตโนมัติ - Sofa Cover Store<br>
            วันที่: {{timestamp}}
          </p>
        </div>
      </div>
    `,
    variables: ["productName", "productId", "currentStock", "minStock", "location", "dashboardUrl", "timestamp"],
  },

  stock_out_email: {
    id: "stock_out_email",
    name: "แจ้งเตือนหมดสต็อก - อีเมล",
    type: "email",
    subject: "🚨 แจ้งเตือนหมดสต็อก - {{productName}}",
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
          <h2 style="color: #dc3545; margin: 0 0 20px 0;">🚨 แจ้งเตือนหมดสต็อก</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 15px 0;">รายละเอียดสินค้า</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">ชื่อสินค้า:</td>
                <td style="padding: 8px 0;">{{productName}}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">รหัสสินค้า:</td>
                <td style="padding: 8px 0;">{{productId}}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">สต็อกปัจจุบัน:</td>
                <td style="padding: 8px 0; color: #dc3545; font-weight: bold;">0 ชิ้น</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">ตำแหน่ง:</td>
                <td style="padding: 8px 0;">{{location}}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; color: #721c24;">
              <strong>⚠️ ด่วน:</strong> สินค้าดังกล่าวหมดสต็อกแล้ว กรุณาดำเนินการเติมสต็อกโดยเร็วที่สุด
            </p>
          </div>
          
          <div style="text-align: center;">
            <a href="{{dashboardUrl}}" style="background: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              ดำเนินการเติมสต็อก
            </a>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #dee2e6;">
          <p style="text-align: center; color: #6c757d; font-size: 14px; margin: 0;">
            ระบบแจ้งเตือนอัตโนมัติ - Sofa Cover Store<br>
            วันที่: {{timestamp}}
          </p>
        </div>
      </div>
    `,
    variables: ["productName", "productId", "location", "dashboardUrl", "timestamp"],
  },

  stock_low_sms: {
    id: "stock_low_sms",
    name: "แจ้งเตือนสต็อกต่ำ - SMS",
    type: "sms",
    content:
      "⚠️ แจ้งเตือนสต็อกต่ำ\n{{productName}} ({{productId}})\nสต็อกปัจจุบัน: {{currentStock}} ชิ้น\nขั้นต่ำ: {{minStock}} ชิ้น\nกรุณาตรวจสอบ",
    variables: ["productName", "productId", "currentStock", "minStock"],
  },

  stock_out_sms: {
    id: "stock_out_sms",
    name: "แจ้งเตือนหมดสต็อก - SMS",
    type: "sms",
    content: "🚨 แจ้งเตือนหมดสต็อก\n{{productName}} ({{productId}})\nสต็อก: 0 ชิ้น\nกรุณาเติมสต็อกด่วน!",
    variables: ["productName", "productId"],
  },

  stock_low_line: {
    id: "stock_low_line",
    name: "แจ้งเตือนสต็อกต่ำ - Line",
    type: "line",
    content: `⚠️ แจ้งเตือนสต็อกต่ำ

📦 สินค้า: {{productName}}
🏷️ รหัส: {{productId}}
📊 สต็อกปัจจุบัน: {{currentStock}} ชิ้น
📉 ขั้นต่ำ: {{minStock}} ชิ้น
📍 ตำแหน่ง: {{location}}

กรุณาตรวจสอบและเติมสต็อก`,
    variables: ["productName", "productId", "currentStock", "minStock", "location"],
  },

  stock_out_line: {
    id: "stock_out_line",
    name: "แจ้งเตือนหมดสต็อก - Line",
    type: "line",
    content: `🚨 แจ้งเตือนหมดสต็อก

📦 สินค้า: {{productName}}
🏷️ รหัส: {{productId}}
📊 สต็อก: 0 ชิ้น
📍 ตำแหน่ง: {{location}}

⚠️ ด่วน: กรุณาเติมสต็อกโดยเร็วที่สุด!`,
    variables: ["productName", "productId", "location"],
  },

  order_created_email: {
    id: "order_created_email",
    name: "แจ้งเตือนออเดอร์ใหม่ - อีเมล",
    type: "email",
    subject: "🛍️ มีออเดอร์ใหม่ - #{{orderId}}",
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
          <h2 style="color: #28a745; margin: 0 0 20px 0;">🛍️ มีออเดอร์ใหม่</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 15px 0;">รายละเอียดออเดอร์</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">หมายเลขออเดอร์:</td>
                <td style="padding: 8px 0;">#{{orderId}}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">ลูกค้า:</td>
                <td style="padding: 8px 0;">{{customerName}}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">ยอดรวม:</td>
                <td style="padding: 8px 0; color: #28a745; font-weight: bold;">{{totalAmount}} บาท</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">จำนวนสินค้า:</td>
                <td style="padding: 8px 0;">{{itemCount}} รายการ</td>
              </tr>
            </table>
          </div>
          
          <div style="text-align: center;">
            <a href="{{orderUrl}}" style="background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              ดูรายละเอียดออเดอร์
            </a>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #dee2e6;">
          <p style="text-align: center; color: #6c757d; font-size: 14px; margin: 0;">
            ระบบแจ้งเตือนอัตโนมัติ - Sofa Cover Store<br>
            วันที่: {{timestamp}}
          </p>
        </div>
      </div>
    `,
    variables: ["orderId", "customerName", "totalAmount", "itemCount", "orderUrl", "timestamp"],
  },
}

// Mock Notification Service
export class MockNotificationService {
  private emailService: MockEmailService
  private smsService: MockSMSService
  private lineService: MockLineNotifyService
  private history: NotificationHistory[] = []

  constructor() {
    this.emailService = new MockEmailService()
    this.smsService = new MockSMSService()
    this.lineService = new MockLineNotifyService()

    // โหลดประวัติจาก localStorage
    this.loadHistory()
    loadNotifyTeams()
  }

  private loadHistory(): void {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mockNotificationHistory")
      if (saved) {
        this.history = JSON.parse(saved)
      }
    }
  }

  private saveHistory(): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("mockNotificationHistory", JSON.stringify(this.history))
    }
  }

  private replaceVariables(template: string, data: Record<string, any>): string {
    let result = template
    Object.keys(data).forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, "g")
      result = result.replace(regex, data[key] || "")
    })
    return result
  }

  private async addToHistory(
    type: string,
    channel: "email" | "sms" | "line",
    recipient: string,
    subject: string | undefined,
    content: string,
    status: "sent" | "failed",
    error?: string,
  ): Promise<void> {
    const historyItem: NotificationHistory = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type,
      channel,
      recipient,
      subject,
      content,
      status,
      error,
      sentAt: status === "sent" ? new Date().toISOString() : undefined,
      createdAt: new Date().toISOString(),
    }

    this.history.unshift(historyItem)

    // เก็บเฉพาะ 500 รายการล่าสุด
    if (this.history.length > 500) {
      this.history = this.history.slice(0, 500)
    }

    this.saveHistory()
  }

  async sendNotification(notificationData: NotificationData): Promise<boolean> {
    const { type, recipient, data, priority } = notificationData
    let customer: Customer | undefined
    if ((data as any).orderId) {
      const order = mockOrders.find((o) => o.id === (data as any).orderId)
      if (order) {
        customer = mockCustomers.find((c) => c.id === order.customerId)
      }
    }
    if (!customer && recipient.email) {
      customer = mockCustomers.find((c) => c.email === recipient.email)
    }
    if (!customer && recipient.phone) {
      customer = mockCustomers.find((c) => c.phone === recipient.phone)
    }
    if (customer?.muted) {
      return false
    }
    const teamMap: Record<NotificationData['type'], keyof typeof notifyTeams> = {
      stock_low: 'packing',
      stock_out: 'packing',
      stock_critical: 'packing',
      order_created: 'packing',
      order_updated: 'packing',
      system_alert: 'finance',
    }
    const team = teamMap[type]
    if (team && !notifyTeams[team]) {
      return true
    }
    let success = false

    // เตรียมข้อมูลทั่วไป
    const commonData = {
      ...data,
      timestamp: new Date().toLocaleString("th-TH"),
      dashboardUrl: "/admin/inventory",
      orderUrl: data.orderId ? `/admin/orders/manual/edit/${data.orderId}` : "/admin/orders",
    }

    try {
      // ส่งอีเมล
      if (recipient.email) {
        const emailTemplate = mockNotificationTemplates[`${type}_email`]
        if (emailTemplate) {
          const subject = this.replaceVariables(emailTemplate.subject || "", commonData)
          const content = this.replaceVariables(emailTemplate.content, commonData)

          const emailSent = await this.emailService.sendEmail(recipient.email, subject, content)
          await this.addToHistory(type, "email", recipient.email, subject, content, emailSent ? "sent" : "failed")

          if (emailSent) success = true
        }
      }

      // ส่ง SMS
      if (recipient.phone) {
        const smsTemplate = mockNotificationTemplates[`${type}_sms`]
        if (smsTemplate) {
          const content = this.replaceVariables(smsTemplate.content, commonData)

          const smsSent = await this.smsService.sendSMS(recipient.phone, content)
          await this.addToHistory(type, "sms", recipient.phone, undefined, content, smsSent ? "sent" : "failed")

          if (smsSent) success = true
        }
      }

      // ส่ง Line Notify
      const lineTemplate = mockNotificationTemplates[`${type}_line`]
      if (lineTemplate) {
        const content = this.replaceVariables(lineTemplate.content, commonData)

        const lineSent = await this.lineService.sendLineNotify(content)
        await this.addToHistory(type, "line", "Line Group", undefined, content, lineSent ? "sent" : "failed")

        if (lineSent) success = true
      }

      return success
    } catch (error) {
      console.error("Mock notification send error:", error)
      return false
    }
  }

  getHistory(): NotificationHistory[] {
    return this.history
  }

  getTemplates(): NotificationTemplate[] {
    return Object.values(mockNotificationTemplates)
  }

  clearHistory(): void {
    this.history = []
    this.saveHistory()
  }

  // จำลองการส่งการแจ้งเตือนหลายรายการ
  async sendBulkNotifications(notifications: NotificationData[]): Promise<{ success: number; failed: number }> {
    let success = 0
    let failed = 0

    for (const notification of notifications) {
      const result = await this.sendNotification(notification)
      if (result) {
        success++
      } else {
        failed++
      }
    }

    return { success, failed }
  }
}

// Export singleton instance
export const mockNotificationService = new MockNotificationService()
