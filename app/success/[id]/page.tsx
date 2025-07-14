"use client";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card";
import { mockOrders } from "@/lib/mock-orders";
import { autoMessage, loadAutoMessage } from "@/lib/mock-settings";
import { addFeedback } from "@/lib/mock-feedback";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function SuccessPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [message, setMessage] = useState(autoMessage);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    loadAutoMessage();
    setMessage(autoMessage);
  }, []);
  const order = mockOrders.find((o) => o.id === id);

  const submitFeedback = () => {
    if (submitted || rating === 0) return;
    addFeedback({
      orderId: id,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    });
    setSubmitted(true);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>การชำระเงินสำเร็จ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p>{message}</p>
            <div className="flex justify-center">
              <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">
                QR {id}
              </div>
            </div>
            <p className="font-semibold">รหัสคำสั่งซื้อ: {id}</p>
            <div className="space-x-2">
              <Link href={`/orders/${id}`}>
                <Button>ดูคำสั่งซื้อ</Button>
              </Link>
              {order && (
                <Link href={`/invoice/${id}`}>
                  <Button variant="outline">ดูใบเสร็จ</Button>
                </Link>
              )}
            </div>
            {!submitted && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      onClick={() => setRating(i + 1)}
                      className={`h-5 w-5 cursor-pointer ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <textarea
                  className="w-full border rounded p-2 text-sm"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="แสดงความคิดเห็น"
                />
                <Button
                  onClick={submitFeedback}
                  disabled={rating === 0}
                  className="w-full"
                >
                  ส่งความคิดเห็น
                </Button>
              </div>
            )}
            {submitted && (
              <p className="text-green-600">ขอบคุณสำหรับความคิดเห็น</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
