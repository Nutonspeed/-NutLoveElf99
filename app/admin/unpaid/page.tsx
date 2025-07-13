"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { mockBills } from "@/lib/mock-bills";

export default function AdminUnpaidPage() {
  const [bills, setBills] = useState(mockBills);
  const unpaid = bills.filter((b) => b.status === "unpaid");

  const sendReminder = (id: string) => {
    toast(`ส่งเตือนบิล ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">บิลค้างจ่าย</h1>
            <p className="text-gray-600">รายการบิลที่ยังไม่ชำระ</p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>บิลค้างจ่าย ({unpaid.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unpaid.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>{b.id}</TableCell>
                    <TableCell>{b.orderId}</TableCell>
                    <TableCell>{b.dueDate || "-"}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => sendReminder(b.id)}
                      >
                        <Mail className="h-4 w-4 mr-1" /> ส่งเตือน
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {unpaid.length === 0 && (
              <p className="text-center py-8 text-sm text-gray-500">
                ไม่พบข้อมูล
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
