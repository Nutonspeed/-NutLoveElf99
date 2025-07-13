"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  loadAutoMessage,
  autoMessage,
  setAutoMessage,
  loadSocialLinks,
  socialLinks,
  setSocialLinks,
  loadBillSecurity,
  billSecurity,
  setBillSecurity,
  loadAutoReminder,
  autoReminder,
  setAutoReminder,
  loadReviewReminder,
  reviewReminder,
  setReviewReminder,
} from "@/lib/mock-settings";

export default function SettingsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState(autoMessage);
  const [links, setLinks] = useState(socialLinks);
  const [security, setSecurity] = useState(billSecurity);
  const [reminder, setReminder] = useState(autoReminder);
  const [reviewRemind, setReviewRemind] = useState(reviewReminder);

  useEffect(() => {
    loadAutoMessage();
    loadSocialLinks();
    loadBillSecurity();
    loadAutoReminder();
    loadReviewReminder();
    setMessage(autoMessage);
    setLinks(socialLinks);
    setSecurity(billSecurity);
    setReminder(autoReminder);
    setReviewRemind(reviewReminder);
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user?.role !== "admin") {
      router.push("/");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== "admin") return null;

  const handleSave = () => {
    setAutoMessage(message);
    setSocialLinks(links);
    setBillSecurity(security);
    setAutoReminder(reminder);
    setReviewReminder(reviewRemind);
    alert("บันทึกข้อความแล้ว");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ตั้งค่าข้อความหลังชำระเงิน</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ข้อความขอบคุณ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleSave}>บันทึก</Button>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>ลิงก์ Social</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={links.facebook}
              onChange={(e) => setLinks({ ...links, facebook: e.target.value })}
              placeholder="Facebook Page URL"
            />
            <Input
              value={links.line}
              onChange={(e) => setLinks({ ...links, line: e.target.value })}
              placeholder="Line URL"
            />
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>เตือนอัตโนมัติ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="auto-remind"
                checked={reminder}
                onCheckedChange={(v) => setReminder(Boolean(v))}
              />
              <Label htmlFor="auto-remind">แจ้งเตือนบิลค้างชำระ</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="review-remind"
                checked={reviewRemind}
                onCheckedChange={(v) => setReviewRemind(Boolean(v))}
              />
              <Label htmlFor="review-remind">เตือนให้รีวิวหลัง 3 วัน</Label>
            </div>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>ความปลอดภัยหน้าบิล</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sec-enabled"
                checked={security.enabled}
                onCheckedChange={(v) =>
                  setSecurity({ ...security, enabled: Boolean(v) })
                }
              />
              <Label htmlFor="sec-enabled">ต้องยืนยันก่อนเข้าบิล</Label>
            </div>
            <Input
              placeholder="เบอร์โทร"
              value={security.phone}
              onChange={(e) =>
                setSecurity({ ...security, phone: e.target.value })
              }
            />
            <Input
              placeholder="PIN"
              value={security.pin}
              onChange={(e) =>
                setSecurity({ ...security, pin: e.target.value })
              }
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
