"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Trash2, Archive, CheckCircle, XCircle, Mail, Printer } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ConfirmationDialog } from "./confirmation-dialog"
import type { Order } from "@/types/order"
import type { OrderStatus } from "@/types/order"

interface BulkActionsProps {
  orders: Order[]
  selectedOrders: string[]
  onSelectionChange: (orderIds: string[]) => void
  onOrdersUpdate: (orders: Order[]) => void
}

export function BulkActions({ orders, selectedOrders, onSelectionChange, onOrdersUpdate }: BulkActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [bulkAction, setBulkAction] = useState<string>("")
  const { toast } = useToast()

  const selectedOrdersData = orders.filter((order) => selectedOrders.includes(order.id))
  const isAllSelected = orders.length > 0 && selectedOrders.length === orders.length
  const isPartialSelected = selectedOrders.length > 0 && selectedOrders.length < orders.length

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(orders.map((order) => order.id))
    } else {
      onSelectionChange([])
    }
  }

  const handleBulkAction = async (action: string) => {
    if (selectedOrders.length === 0) {
      toast({
        title: "ไม่มีออเดอร์ที่เลือก",
        description: "กรุณาเลือกออเดอร์ที่ต้องการดำเนินการ",
        variant: "destructive",
      })
      return
    }

    switch (action) {
      case "delete":
        setShowDeleteDialog(true)
        break
      case "archive":
        await handleArchiveOrders()
        break
      case "complete":
        await handleUpdateStatus("completed")
        break
      case "cancel":
        await handleUpdateStatus("cancelled")
        break
      case "export":
        await handleExportOrders()
        break
      case "print":
        await handlePrintOrders()
        break
      case "email":
        await handleEmailOrders()
        break
    }
    setBulkAction("")
  }

  const handleDeleteOrders = async () => {
    const updatedOrders = orders.filter((order) => !selectedOrders.includes(order.id))
    onOrdersUpdate(updatedOrders)
    onSelectionChange([])
    setShowDeleteDialog(false)

    toast({
      title: "ลบออเดอร์สำเร็จ",
      description: `ลบออเดอร์ ${selectedOrders.length} รายการแล้ว`,
    })
  }

  const handleArchiveOrders = async () => {
    const updatedOrders = orders.map((order) =>
      selectedOrders.includes(order.id) ? { ...order, status: "archived" as const } : order,
    )
    onOrdersUpdate(updatedOrders)
    onSelectionChange([])

    toast({
      title: "เก็บถาวรสำเร็จ",
      description: `เก็บถาวรออเดอร์ ${selectedOrders.length} รายการแล้ว`,
    })
  }

  const handleUpdateStatus = async (status: OrderStatus) => {
    const updatedOrders = orders.map((order) => (selectedOrders.includes(order.id) ? { ...order, status } : order))
    onOrdersUpdate(updatedOrders)
    onSelectionChange([])

    const statusText = {
      completed: "เสร็จสิ้น",
      cancelled: "ยกเลิก",
      pending: "รอดำเนินการ",
      processing: "กำลังดำเนินการ",
      shipped: "จัดส่งแล้ว",
      delivered: "ส่งมอบแล้ว",
      archived: "เก็บถาวร",
    }

    toast({
      title: "อัปเดตสถานะสำเร็จ",
      description: `อัปเดตสถานะเป็น "${statusText[status]}" สำหรับ ${selectedOrders.length} รายการ`,
    })
  }

  const handleExportOrders = async () => {
    // สร้าง CSV data
    const csvData = selectedOrdersData.map((order) => ({
      รหัสออเดอร์: order.orderNumber,
      ชื่อลูกค้า: order.customerInfo.name,
      เบอร์โทร: order.customerInfo.phone,
      ยอดรวม: order.totalAmount,
      สถานะ: order.status,
      วันที่สร้าง: new Date(order.createdAt).toLocaleDateString("th-TH"),
    }))

    const csvContent = [Object.keys(csvData[0]).join(","), ...csvData.map((row) => Object.values(row).join(","))].join(
      "\n",
    )

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `orders_${new Date().toISOString().split("T")[0]}.csv`
    link.click()

    onSelectionChange([])
    toast({
      title: "ส่งออกข้อมูลสำเร็จ",
      description: `ส่งออกข้อมูล ${selectedOrders.length} รายการเป็นไฟล์ CSV`,
    })
  }

  const handlePrintOrders = async () => {
    // สร้างหน้าต่างใหม่สำหรับพิมพ์
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const printContent = `
      <html>
        <head>
          <title>รายการออเดอร์</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>รายการออเดอร์ที่เลือก</h2>
          <table>
            <thead>
              <tr>
                <th>รหัสออเดอร์</th>
                <th>ชื่อลูกค้า</th>
                <th>เบอร์โทร</th>
                <th>ยอดรวม</th>
                <th>สถานะ</th>
                <th>วันที่</th>
              </tr>
            </thead>
            <tbody>
              ${selectedOrdersData
                .map(
                  (order) => `
                <tr>
                  <td>${order.orderNumber}</td>
                  <td>${order.customerInfo.name}</td>
                  <td>${order.customerInfo.phone}</td>
                  <td>฿${order.totalAmount.toLocaleString()}</td>
                  <td>${order.status}</td>
                  <td>${new Date(order.createdAt).toLocaleDateString("th-TH")}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `

    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.print()

    onSelectionChange([])
    toast({
      title: "เตรียมพิมพ์สำเร็จ",
      description: `เตรียมพิมพ์ออเดอร์ ${selectedOrders.length} รายการ`,
    })
  }

  const handleEmailOrders = async () => {
    // จำลองการส่งอีเมล
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSelectionChange([])
    toast({
      title: "ส่งอีเมลสำเร็จ",
      description: `ส่งอีเมลแจ้งเตือนสำหรับ ${selectedOrders.length} รายการ`,
    })
  }

  if (orders.length === 0) return null

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={handleSelectAll}
                ref={(ref) => {
                  if (ref) {
                    ref.indeterminate = isPartialSelected
                  }
                }}
              />
              <span className="text-sm text-muted-foreground">
                {selectedOrders.length > 0
                  ? `เลือกแล้ว ${selectedOrders.length} จาก ${orders.length} รายการ`
                  : `ทั้งหมด ${orders.length} รายการ`}
              </span>
              {selectedOrders.length > 0 && <Badge variant="secondary">{selectedOrders.length} รายการ</Badge>}
            </div>

            {selectedOrders.length > 0 && (
              <div className="flex items-center space-x-2">
                <Select value={bulkAction} onValueChange={setBulkAction}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="เลือกการดำเนินการ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="complete">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        ทำเครื่องหมายเสร็จสิ้น
                      </div>
                    </SelectItem>
                    <SelectItem value="cancel">
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 mr-2 text-red-600" />
                        ยกเลิกออเดอร์
                      </div>
                    </SelectItem>
                    <SelectItem value="archive">
                      <div className="flex items-center">
                        <Archive className="h-4 w-4 mr-2 text-blue-600" />
                        เก็บถาวร
                      </div>
                    </SelectItem>
                    <SelectItem value="export">
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-2 text-purple-600" />
                        ส่งออก CSV
                      </div>
                    </SelectItem>
                    <SelectItem value="print">
                      <div className="flex items-center">
                        <Printer className="h-4 w-4 mr-2 text-gray-600" />
                        พิมพ์รายการ
                      </div>
                    </SelectItem>
                    <SelectItem value="email">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-blue-600" />
                        ส่งอีเมลแจ้งเตือน
                      </div>
                    </SelectItem>
                    <SelectItem value="delete">
                      <div className="flex items-center">
                        <Trash2 className="h-4 w-4 mr-2 text-red-600" />
                        ลบออเดอร์
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Button onClick={() => handleBulkAction(bulkAction)} disabled={!bulkAction} size="sm">
                  ดำเนินการ
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="ยืนยันการลบออเดอร์"
        description={`คุณต้องการลบออเดอร์ ${selectedOrders.length} รายการใช่หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้`}
        confirmText="ลบออเดอร์"
        cancelText="ยกเลิก"
        onConfirm={handleDeleteOrders}
        variant="destructive"
      />
    </>
  )
}
