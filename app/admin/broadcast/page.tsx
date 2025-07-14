"use client";
import { useState } from "react";
import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card";
import { Input } from "@/components/ui/inputs/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { mockCustomers } from "@/lib/mock-customers";

export default function BroadcastPage() {
  const [tier, setTier] = useState("all");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");

  const send = () => {
    toast.success(`ส่งข้อความถึงลูกค้า ${tier}`);
    setMessage("");
    setLink("");
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
            <h1 className="text-3xl font-bold">Broadcast</h1>
            <p className="text-gray-600">ส่งข้อความถึงลูกค้า (mock)</p>
          </div>
        </div>
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>ตั้งค่าข้อความ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={tier} onValueChange={setTier}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="ทั้งหมด" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  ลูกค้าทั้งหมด ({mockCustomers.length})
                </SelectItem>
                <SelectItem value="VIP">เฉพาะ VIP</SelectItem>
                <SelectItem value="Gold">เฉพาะ Gold</SelectItem>
                <SelectItem value="Silver">เฉพาะ Silver</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="ข้อความ"
            />
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="ลิงก์ (ไม่บังคับ)"
            />
            <Button onClick={send} disabled={!message}>
              <Send className="h-4 w-4 mr-1" /> ส่งข้อความ
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
