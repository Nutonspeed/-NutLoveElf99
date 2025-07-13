"use client";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addFeedback } from "@/lib/mock-feedback";
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

  const submit = () => {
    if (rating === 0 || submitted) return;
    addFeedback({
      orderId,
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
                  disabled={rating === 0}
                  className="w-full"
                >
                  ส่งความคิดเห็น
                </Button>
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
