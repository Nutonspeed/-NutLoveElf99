"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/buttons/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

export default function ReviewPage({
  params,
}: {
  params: { orderId: string };
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`/api/reviews?orderId=${params.orderId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.reviews?.length) setSubmitted(true);
      })
      .catch(() => {});
  }, [params.orderId]);

  const submit = async () => {
    if (!rating || submitted) return;
    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: params.orderId, rating, comment }),
    }).then((r) => {
      if (r.ok) setSubmitted(true);
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold">
          ให้คะแนนคำสั่งซื้อ {params.orderId}
        </h1>
        {submitted ? (
          <p className="text-green-600">คุณได้ส่งรีวิวไปแล้ว ขอบคุณค่ะ</p>
        ) : (
          <div className="space-y-4">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  onClick={() => setRating(i)}
                  className={`w-6 h-6 cursor-pointer ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="เขียนรีวิว"
            />
            <Button onClick={submit}>ส่งรีวิว</Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
