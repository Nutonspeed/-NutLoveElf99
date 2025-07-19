import type { ReturnRequest, ReturnStatus } from "@/types/return";

export let mockReturns: ReturnRequest[] = [];

export function loadReturns() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("returns");
    if (stored) mockReturns = JSON.parse(stored);
  }
}

function save() {
  if (typeof window !== "undefined") {
    localStorage.setItem("returns", JSON.stringify(mockReturns));
  }
}

export function addReturnRequest(req: ReturnRequest) {
  mockReturns.push(req);
  save();
}

export function updateReturnStatus(
  id: string,
  status: ReturnStatus,
  comment?: string,
) {
  const r = mockReturns.find((r) => r.id === id);
  if (!r) return;
  r.status = status;
  if (comment) {
    r.comments.push({ text: comment, date: new Date().toISOString() });
  }
  save();
}

export function addReturnComment(id: string, text: string) {
  const r = mockReturns.find((r) => r.id === id);
  if (!r) return;
  r.comments.push({ text, date: new Date().toISOString() });
  save();
}
