export interface Feedback {
  orderId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export let mockFeedbacks: Feedback[] = [];

export function loadFeedbacks() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("feedbacks");
    if (stored) mockFeedbacks = JSON.parse(stored);
  }
}

export function addFeedback(fb: Feedback) {
  mockFeedbacks.push(fb);
  if (typeof window !== "undefined") {
    localStorage.setItem("feedbacks", JSON.stringify(mockFeedbacks));
  }
}
