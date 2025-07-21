"use client"
import { useEffect } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/inputs/input"
import { useToast } from "@/hooks/use-toast"
import { mockBills } from "@/lib/mock-bills"
import {
  mockNotificationService
} from "@/lib/mock-notification-service"
import {
  mockAdminLogs,
  loadAdminLogs,
  addAdminLog
} from "@/lib/mock-admin-logs"
import { downloadJSON, exportCSV } from "@/lib/mock-export"
import { useAuth } from "@/contexts/auth-context"

export default function BillingBackupPage() {
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    loadAdminLogs()
  }, [])

  const handleExportJSON = () => {
    const data = {
      bills: mockBills,
      notifications: mockNotificationService.getHistory(),
      auditLogs: mockAdminLogs,
    }
    downloadJSON(data, "billing-backup.json")
    addAdminLog("export billing backup", user?.id || "unknown")
    toast({ title: "ส่งออกข้อมูลแล้ว" })
  }

  const handleExportCSV = () => {
    const csv = exportCSV(mockBills)
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "billing-backup.csv"
    a.click()
    URL.revokeObjectURL(url)
    addAdminLog("export billing backup csv", user?.id || "unknown")
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const obj = JSON.parse(reader.result as string)
        if (!obj.bills || !obj.notifications || !obj.auditLogs) {
          throw new Error("invalid format")
        }
        mockBills.splice(0, mockBills.length, ...obj.bills)
        localStorage.setItem(
          "mockNotificationHistory",
          JSON.stringify(obj.notifications),
        )
        ;(mockNotificationService as any).history = obj.notifications
        ;(mockNotificationService as any).saveHistory?.()
        mockAdminLogs.splice(0, mockAdminLogs.length, ...obj.auditLogs)
        localStorage.setItem("adminLogs", JSON.stringify(mockAdminLogs))
        addAdminLog("import billing backup", user?.id || "unknown")
        toast({ title: "นำเข้าข้อมูลแล้ว" })
      } catch {
        toast({ title: "นำเข้าไม่สำเร็จ", variant: "destructive" })
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Billing Backup</h1>
      <div className="flex flex-col gap-2 max-w-sm">
        <Button onClick={handleExportJSON}>Export JSON</Button>
        <Button variant="outline" onClick={handleExportCSV}>
          Export CSV
        </Button>
        <Input type="file" onChange={handleImport} />
      </div>
    </div>
  )
}
