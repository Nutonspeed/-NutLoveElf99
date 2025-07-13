"use client";
import { Star } from "lucide-react";
import type { Feedback } from "@/lib/mock-feedback";

export default function FeedbackCard({ fb }: { fb: Feedback }) {
  return (
    <div className="border rounded p-4 space-y-2">
      <div className="flex items-center space-x-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < fb.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-500">
          {new Date(fb.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-sm">{fb.comment}</p>
      <p className="text-xs text-gray-500">Order: {fb.orderId}</p>
    </div>
  );
}
