"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card";
import { addFeedback, loadFeedbacks, mockFeedbacks } from "@/lib/mock-feedback";
import { Star } from "lucide-react";

export default function FeedbackPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { orderId } = params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadFeedbacks();
    const c = Number(localStorage.getItem('fbCount') || '0');
    setCount(c);
    if (mockFeedbacks.some((f) => f.orderId === orderId)) {
      setSubmitted(true);
    }
  }, [orderId]);

  const submit = () => {
    if (rating === 0 || submitted || count >= 5) return;
    const ok = addFeedback({
      orderId,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    });
    if (ok) {
      localStorage.setItem('fbCount', String(count + 1));
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>ให้คะแนนคำสั่งซื้อ {orderId}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-center">
            {!submitted ? (
              <>
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
                  onClick={submit}
                  disabled={rating === 0 || count >= 5}
                  className="w-full"
                >
                  ส่งความคิดเห็น
                </Button>
                {count >= 5 && (
                  <p className="text-sm text-red-600">ส่งได้สูงสุด 5 ครั้ง</p>
                )}
              </>
            ) : (
              <p className="text-green-600">บันทึกความคิดเห็นแล้ว</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
