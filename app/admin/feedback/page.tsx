"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card";
import { Button } from "@/components/ui/buttons/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { loadFeedbacks, mockFeedbacks } from "@/lib/mock-feedback";
import FeedbackCard from "@/components/FeedbackCard";

export default function FeedbackListPage() {
  const [items, setItems] = useState(mockFeedbacks);
  useEffect(() => {
    loadFeedbacks();
    const filtered = mockFeedbacks.filter((fb) => {
      if (typeof window === "undefined") return true;
      return !localStorage.getItem("fb-" + fb.orderId);
    });
    setItems(filtered);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Feedback</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>รายการความคิดเห็น ({items.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((fb, idx) => (
              <FeedbackCard key={idx} fb={fb} />
            ))}
            {items.length === 0 && (
              <p className="text-center text-sm text-gray-500">ไม่มีข้อมูล</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
