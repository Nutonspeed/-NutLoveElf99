export type ReturnStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "infoRequested"
  | "refunded";

export interface ReturnItem {
  productName: string;
  quantity: number;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  customerName: string;
  type: "return" | "exchange";
  items: ReturnItem[];
  reason: string;
  newProduct?: string;
  images: string[];
  status: ReturnStatus;
  comments: Array<{ text: string; date: string }>;
  refund?: { amount: number; method: string; date: string };
}
