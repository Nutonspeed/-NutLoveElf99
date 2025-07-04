import nodemailer from "nodemailer"

// Types
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

// Email Service
class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  async sendEmail(to: string, subject: string, html: string, text?: string): Promise<boolean> {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.SMTP_FROM || "noreply@sofacover.com",
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, ""),
      })

      console.log("Email sent:", info.messageId)
      return true
    } catch (error) {
      console.error("Email send error:", error)
      return false
    }
  }
}

// SMS Service (Twilio)
class SMSService {
  private accountSid: string
  private authToken: string
  private fromNumber: string

  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID || ""
    this.authToken = process.env.TWILIO_AUTH_TOKEN || ""
    this.fromNumber = process.env.TWILIO_FROM_NUMBER || ""
  }

  async sendSMS(to: string, message: string): Promise<boolean> {
    try {
      if (!this.accountSid || !this.authToken) {
        console.log("SMS Service not configured")
        return false
      }

      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${this.accountSid}:${this.authToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          From: this.fromNumber,
          To: to,
          Body: message,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log("SMS sent:", result.sid)
        return true
      } else {
        console.error("SMS send error:", await response.text())
        return false
      }
    } catch (error) {
      console.error("SMS send error:", error)
      return false
    }
  }
}

// Line Notify Service
class LineNotifyService {
  private token: string

  constructor() {
    this.token = process.env.LINE_NOTIFY_TOKEN || ""
  }

  async sendLineNotify(message: string): Promise<boolean> {
    try {
      if (!this.token) {
        console.log("Line Notify not configured")
        return false
      }

      const response = await fetch("https://notify-api.line.me/api/notify", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          message,
        }),
      })

      if (response.ok) {
        console.log("Line Notify sent successfully")
        return true
      } else {
        console.error("Line Notify error:", await response.text())
        return false
      }
    } catch (error) {
      console.error("Line Notify error:", error)
      return false
    }
  }
}

// Notification Templates
export const notificationTemplates: Record<string, NotificationTemplate> = {
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
}

// Main Notification Service
export class NotificationService {
  private emailService: EmailService
  private smsService: SMSService
  private lineService: LineNotifyService
  private history: NotificationHistory[] = []

  constructor() {
    this.emailService = new EmailService()
    this.smsService = new SMSService()
    this.lineService = new LineNotifyService()
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
      id: Date.now().toString(),
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

    // Keep only last 1000 records
    if (this.history.length > 1000) {
      this.history = this.history.slice(0, 1000)
    }
  }

  async sendNotification(notificationData: NotificationData): Promise<boolean> {
    const { type, recipient, data, priority } = notificationData
    let success = false

    // Prepare common data
    const commonData = {
      ...data,
      timestamp: new Date().toLocaleString("th-TH"),
      dashboardUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/admin/inventory`,
    }

    try {
      // Send Email
      if (recipient.email) {
        const emailTemplate = notificationTemplates[`${type}_email`]
        if (emailTemplate) {
          const subject = this.replaceVariables(emailTemplate.subject || "", commonData)
          const content = this.replaceVariables(emailTemplate.content, commonData)

          const emailSent = await this.emailService.sendEmail(recipient.email, subject, content)
          await this.addToHistory(type, "email", recipient.email, subject, content, emailSent ? "sent" : "failed")

          if (emailSent) success = true
        }
      }

      // Send SMS
      if (recipient.phone) {
        const smsTemplate = notificationTemplates[`${type}_sms`]
        if (smsTemplate) {
          const content = this.replaceVariables(smsTemplate.content, commonData)

          const smsSent = await this.smsService.sendSMS(recipient.phone, content)
          await this.addToHistory(type, "sms", recipient.phone, undefined, content, smsSent ? "sent" : "failed")

          if (smsSent) success = true
        }
      }

      // Send Line Notify
      const lineTemplate = notificationTemplates[`${type}_line`]
      if (lineTemplate) {
        const content = this.replaceVariables(lineTemplate.content, commonData)

        const lineSent = await this.lineService.sendLineNotify(content)
        await this.addToHistory(type, "line", "Line Group", undefined, content, lineSent ? "sent" : "failed")

        if (lineSent) success = true
      }

      return success
    } catch (error) {
      console.error("Notification send error:", error)
      return false
    }
  }

  getHistory(): NotificationHistory[] {
    return this.history
  }

  getTemplates(): NotificationTemplate[] {
    return Object.values(notificationTemplates)
  }
}

// Export singleton instance
export const notificationService = new NotificationService()
